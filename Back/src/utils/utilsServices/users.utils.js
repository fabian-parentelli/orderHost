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

export { verifyRole, userOrAdmin };