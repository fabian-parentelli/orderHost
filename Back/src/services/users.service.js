import { userRepository, activityRepository } from "../repositories/index.repositories.js";
import { UserNotFound } from '../utils/custom-exceptions.utils.js';
import { createHash, isValidPassword } from '../utils/hashedPassword.utils.js';
import { generateToken, passwordToken } from '../utils/jwt.utils.js';
import { recoverPassword_HTML } from '../utils/html/recoverPassword.utils.js';
import { sendEmail } from './email.service.js';
import env from '../config/dotEnv.config.js';
import { v4 as uuidv4 } from 'uuid';
import { userOrAdmin } from '../utils/utilsServices/users.utils.js';
import { getPublicId, deleteImg } from "../config/cloudinary.config.js";
import { postUserHtml } from "../utils/html/postUser.html.js";

const register = async (user) => {
    const isUser = await userRepository.exists(user.email);
    if (isUser) throw new UserNotFound('Ya existe un usuario con este email');
    user.password = createHash(user.password);
    const result = await userRepository.register(user);
    if (!result) throw new UserNotFound('No se puede registrar al usuario');
    await activityRepository.create({ eventId: result._id, userId: result._id, type: 'register' });
    delete result.password;
    const accesToken = generateToken(result);
    return { status: 'success', accesToken };
};

const login = async (user) => {
    const isUser = await userRepository.getByEmail(user.email);
    if (!isUser) throw new UserNotFound('Email no válido');
    const comparePassword = isValidPassword(isUser, user.password);
    if (!comparePassword) throw new UserNotFound('La contraseña es incorrecta');
    if (!isUser.active) throw new UserNotFound('Error de permisos, comunícate con nosotros');
    await activityRepository.create({ eventId: isUser._id, userId: isUser._id, type: 'login' });
    delete isUser.password;
    const accesToken = generateToken(isUser);
    return { status: 'success', accesToken };
};

const recoverPassword = async ({ email }) => {
    const user = await userRepository.getByEmail(email);
    if (!user) throw new UserNotFound('Email no válido');
    user.passId = uuidv4();
    const result = await userRepository.update(user);
    if (!result) throw new UserNotFound('No se puede guardar la clave generada');
    user.recoverPassword = `${env.backUrl}/api/user/inter_pass/${user.passId}`;
    const emailTo = {
        to: user.email,
        subject: 'Recuperar contraseña',
        html: await recoverPassword_HTML(user.recoverPassword)
    };
    await sendEmail(emailTo);
    await activityRepository.create({ eventId: result._id, userId: result._id, type: 'what_email' });
    return { status: 'success' };
};

const postUser = async ({ body }, imagesUrl, { user }) => {
    body = JSON.parse(body);
    const password = body.password;
    const isUser = await userRepository.exists(body.email);
    if (isUser) throw new UserNotFound('Ya existe un usuario con este email');
    if (imagesUrl && imagesUrl.length > 0) body.avatar = [imagesUrl[0]];
    if (user.role === 'seller') body.seller = [user._id];
    body.password = createHash(body.password);
    const result = await userRepository.register(body);
    if (!result) throw new UserNotFound('No se puede registrar al usuario');
    await activityRepository.create({ eventId: result._id, userId: user.role === 'seller' ? user._id : 'admin', type: 'postUser' });
    result.password = password;
    const emailTo = {
        to: body.email,
        subject: 'Creamos tu perfil',
        html: await postUserHtml(result)
    };
    await sendEmail(emailTo);
    return { status: 'success' };
};

const current = async ({ user }) => {
    const userDb = await userRepository.getById(user._id);
    if (!userDb) throw new UserNotFound('No se encuentra el usuario en la base de datos');
    delete userDb.password;
    return userDb;
};

const interPass = async ({ id }) => {
    const user = await userRepository.getByIdPass(id);
    if (!user) throw new UserNotFound('Usuario no encontrado');
    const tokenPass = passwordToken(user.email);
    const url = `${env.frontUrl}/password/${tokenPass}`;
    return url;
};

const getAutoComplete = async ({ active, seller }) => {
    const query = { role: { $ne: 'master' } };
    if (active !== undefined) query.active = active;
    if (seller) query.role = { $in: ['seller', 'admin'], $ne: 'master' };
    const result = await userRepository.getAutoComplete(query);
    if (!result) throw new UserNotFound('Error al tarer los datos del autompleteado');
    return { status: 'success', result };
};

const getUsers = async ({ page = 1, active, id, role, city }) => {
    const query = {};
    if (id) query._id = id;
    if (active !== undefined) query.active = active;
    if (role) query.role = role;
    if (city) query['location.city'] = city;
    const result = await userRepository.getUsers(query, page);
    if (!result) throw new UserNotFound('Error al tarer los usuarios');
    return { status: 'success', result };
};

const newPassword = async ({ password: newPassword }, { user: email }) => {
    const user = await userRepository.getByEmail(email);
    if (!user) throw new UserNotFound('Usuario no encontrado');
    const comparePassword = isValidPassword(user, newPassword);
    if (comparePassword) throw new UserNotFound('No es valida esa contraseña');
    const hasPass = createHash(newPassword);
    user.password = hasPass;
    user.passId = null;
    const result = await userRepository.update(user);
    if (!result) throw new UserNotFound('La contraseña nueva no se puede guardar');
    delete user.password;
    if (user.passId) delete user.passId;
    await activityRepository.create({ eventId: uuidv4(), userId: result._id, type: 'newPassword' });
    return { status: 'success', user };
};

const updateImg = async (body, imagesUrl, { user }) => {
    const userDb = await userRepository.getById(body._id);
    if (!user) throw new UserNotFound('Error al traer al usaurio');
    userDb.avatar.unshift(imagesUrl[0]);
    const result = await userRepository.update(userDb);
    if (!result) throw new UserNotFound('Error al actualizar el usuario');
    return await userOrAdmin(result, 'uploadImg', 'uploadImgforUser', user, userDb);
};

const putAvatar = async (body, { user }) => {
    const userDb = await userRepository.getById(body.id);
    if (!user) throw new UserNotFound('Error al traer al usaurio');
    const index = userDb.avatar.findIndex(ava => ava === body.url);
    if (index !== -1) userDb.avatar.splice(index, 1);
    userDb.avatar.unshift(body.url);
    const result = await userRepository.update(userDb);
    if (!result) throw new UserNotFound('Error al actualizar el usuario');
    return await userOrAdmin(result, 'putAvatar', 'putAvatarFromAdmin', user, userDb);
};

const update = async (body, { user }) => {
    const userDb = await userRepository.getById(body._id);
    if (!userDb) throw new UserNotFound('Error al traer el usuario de la base de datos');
    const newUser = { ...userDb, ...body };
    const result = await userRepository.update(newUser);
    if (!result) throw new UserNotFound('Error al actualizar el usaurio');
    return await userOrAdmin(result, 'uploadImg', 'uploadImgforUser', user, userDb);
};

const deleteAvatar = async (body, { user }) => {
    const userDb = await userRepository.getById(body.id);
    if (!userDb) throw new UserNotFound('Error al traer el usuario de la base de datos');
    const index = userDb.avatar.findIndex(ava => ava === body.url);
    if (index !== -1) userDb.avatar.splice(index, 1);
    const imgId = getPublicId(body.url);
    await deleteImg(imgId);
    const result = await userRepository.update(userDb);
    if (!result) throw new UserNotFound('Error al actualizar el usuario');
    return await userOrAdmin(result, 'deleteAvatar', 'deleteAvatarFromAdmin', user, userDb);
};

export {
    register, login, recoverPassword, current, interPass, getUsers, postUser,
    newPassword, updateImg, putAvatar, update, deleteAvatar, getAutoComplete
};