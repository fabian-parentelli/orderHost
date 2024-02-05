import { v4 as uuidv4 } from 'uuid';
import { sendEmail } from './emial.services.js';
import { UserNotFound } from '../utils/custom-exceptions.utils.js';
import { generateToken, passwordToken } from '../utils/jwt.utils.js';
import { userRepository } from '../repositories/index.repositories.js';
import { registerSuccess } from '../utils/html/registerSuccess.utils.js';
import { createHash, isValidPassword } from '../utils/hashedPassword.utils.js';
import { recoverPassword_HTML } from '../utils/html/recoverPassword.utils.js';

const register = async (user) => {

    const { name, lastName, email, phone, password } = user;
    if (!name || !lastName || !email || !phone || !password) {
        throw new UserNotFound('Faltan datos para poder registrarte');
    };
    const exists = await userRepository.getByEmail(email);
    if (exists) throw new UserNotFound('El usuario ya se encuentra registrado');

    user.password = createHash(password);
    const result = await userRepository.register(user);
    if (!result) throw new UserNotFound('No se puede registrar al usuario');

    const newUser = { ...result };
    delete newUser._doc.password;

    const emailTo = {
        to: user.email,
        subject: 'Registro exitoso',
        html: await registerSuccess(newUser._doc)
    };
    await sendEmail(emailTo);
    return { status: 'success', payload: newUser._doc };
};

const login = async (user) => {
    const userDb = await userRepository.getByEmail(user.email);
    if (!userDb) throw new UserNotFound('El usuario no existe');

    const comparePassword = isValidPassword(userDb, user.password);
    if (!comparePassword) throw new UserNotFound('La contraseña es incorrecta');
    delete userDb.password;

    const accesToken = generateToken(userDb);
    return { status: 'success', accesToken };
};

const recoverPassword = async ({ email }) => {
    const user = await userRepository.getByEmail(email);
    if (!user) throw new UserNotFound('Email no registrado');
    user.passId = uuidv4();
    await userRepository.updateUser(user);
    user.recoverPassword = `http://localhost:8080/api/user/inter_pass/${user.passId}`;
    const emailTo = {
        to: user.email,
        subject: 'Recuperar contaseña',
        html: await recoverPassword_HTML(user.recoverPassword)
    };
    await sendEmail(emailTo);
    return { status: 'success' };
};

const interPass = async (id) => {
    const user = await userRepository.getByIdPass(id);
    if (!user) throw new UserNotFound('Usuario no encontrado');
    const tokenPass = passwordToken(user.email);
    const url = `http://localhost:5173/password/${tokenPass}`;
    return url;
};

const current = async ({ user }) => {
    return user;
};

const newPassword = async ({ password: newPassword }, { user: email }) => {
    const user = await userRepository.getByEmail(email);
    if (!user) throw new UserNotFound('Usuario no encontrado');

    const comparePassword = isValidPassword(user, newPassword);
    if (comparePassword) throw new UserNotFound('La contraseña es incorrecta');

    const hasPass = createHash(newPassword);
    user.password = hasPass;

    delete user.passId;
    const result = await userRepository.updateUser(user);
    if (!result) throw new UserNotFound('La nueva contraseña no se puede guardar');

    delete user.password;
    return { status: 'success', user };
};

const updateUser = async (userBody, { user }) => {
    let userDb = await userRepository.getByEmail(user.email);
    if (!userDb) throw new UserNotFound('No se encuentra el usuario');
    userDb = { ...userDb, ...userBody };
    const result = await userRepository.updateUser(userDb);
    if(!result) throw new UserNotFound('No se puede actualizar el usuario');

    // eliminar las contraseñas <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    
    const accesToken = generateToken(result);
    return { status: 'success', accesToken };
};

export { register, login, recoverPassword, interPass, current, newPassword, updateUser };