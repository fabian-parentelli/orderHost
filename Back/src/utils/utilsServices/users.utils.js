import { activityRepository, alertRepository, userRepository } from "../../repositories/index.repositories.js";
import { UserNotFound } from "../custom-exceptions.utils.js";
import { isValidPassword } from '../hashedPassword.utils.js';
import { createHash } from "../hashedPassword.utils.js";
import { generateToken } from "../jwt.utils.js";

const verifyRole = async (password, userId, roles) => {
    const user = await userRepository.getForRole(userId);
    const comparePassword = isValidPassword(user, password);
    if (!comparePassword) throw new UserNotFound('La contraseña no es correcta');
    if (!roles.includes(user.role)) throw new UserNotFound('No tienes permiso para realizar esta tarea');
};

const userOrAdmin = async (result, activity, activityByAdmin, user, userDb) => {
    if (user._id.toString() === userDb._id.toString()) {
        await activityRepository.create({ eventId: result._id, userId: result._id, type: activity });
        delete result.password;
        const accesToken = generateToken(result);
        return { status: 'success', accesToken };
    } else {
        await activityRepository.create({ eventId: result._id, userId: 'admin', type: activityByAdmin });
        await alertRepository.create({ eventId: result._id, userId: userDb._id, type: activityByAdmin });
        delete result.password;
        return { status: 'success', result };
    };
};

const isUserUtils = async (body) => {
    if (body._id) {
        const user = await userRepository.getById(body._id);
        if (!user) throw new UserNotFound('Error, al traer el usuario');
        if (body.name !== user.name || body.email !== user.email || body.phone !== user.phone ||
            body.location.city !== user.location.city || body.location.address !== user.location.address) {
            const result = await userRepository.update({ ...user, ...body });
            if (!result) throw new UserNotFound('Error, al actualizar el usuario');
            return { userId: body._id };
        } else return { userId: body._id };
    } else {
        const isTehereUser = await userRepository.getByEmail(body.email);
        if (isTehereUser) throw new UserNotFound('Ya existe un usuario con ese email');
        body.password = createHash(body.password);
        const result = await userRepository.register(body);
        if (!result) throw new UserNotFound('Error, al crear el usuario');
        delete body.password;
        const accesToken = generateToken(result);
        return { userId: result._id.toString(), accesToken };
    };
};

export { verifyRole, userOrAdmin, isUserUtils };