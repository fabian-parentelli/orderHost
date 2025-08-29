import { avatarRepository, activityRepository } from "../repositories/index.repositories.js";
import { getPublicId, deleteImg } from "../config/cloudinary.config.js";
import { AvatarNotFound } from '../utils/custom-exceptions.utils.js';
import { verifyRole } from "../utils/utilsServices/users.utils.js";

const postAvatar = async (body, imagesUrl, { user }) => {
    if (user.role !== 'master') throw new AvatarNotFound('Error de permisos');
    body.url = imagesUrl[0];
    const result = await avatarRepository.postAvatar(body);
    if (!result) throw new AvatarNotFound('Error al guardar el avatar');
    await activityRepository.create({ eventId: result._id, userId: 'admin', type: 'newAvatar' });
    return { status: 'success', result };
};

const getAvatars = async ({ page = 1, active }) => {
    const query = {};
    if (active !== undefined) query.active = active;
    const result = await avatarRepository.getAvatars(query, page);
    if (!result) throw new AvatarNotFound('Error al traer los avatares');
    return { status: 'success', result };
};

const putAvatar = async ({ id, password }, { user }) => {
    await verifyRole(password, user._id, ['master']);
    const avatar = await avatarRepository.getById(id);
    avatar.active = !avatar.active;
    const result = await avatarRepository.update(avatar);
    if (!result) throw new AvatarNotFound('Error al actualizar el estado activo del avatar');
    return { status: 'success', result };
};

const deleteAvatar = async ({ id, password }, { user }) => {
    await verifyRole(password, user._id, ['master']);
    const avatar = await avatarRepository.getById(id);
    const imgId = getPublicId(avatar.url);
    if (imgId) deleteImg(imgId);
    const result = await avatarRepository.deleteAvatar(id);
    if (!result) throw new AvatarNotFound('Error al eliminar el avatar');
    return { status: 'success', result };
};

export { postAvatar, getAvatars, putAvatar, deleteAvatar };