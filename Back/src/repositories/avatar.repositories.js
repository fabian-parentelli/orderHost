import { avatarManager } from '../dao/manager/index.manager.js';

export default class AvatarRepository {

    postAvatar = async (avatar) => {
        const result = await avatarManager.postAvatar(avatar);
        return result;
    };
    
    getAvatars = async (query, page) => {
        const result = await avatarManager.getAvatars(query, page);
        return result;
    };
    
    getById = async (id) => {
        const result = await avatarManager.getById(id);
        return result;
    };
    
    update = async (avatar) => {
        const result = await avatarManager.update(avatar);
        return result;
    };
    
    deleteAvatar = async (id) => {
        const result = await avatarManager.deleteAvatar(id);
        return result;
    };
};