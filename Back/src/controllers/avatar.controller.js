import * as avatarService from '../services/avatar.service.js';
import { AvatarNotFound } from '../utils/custom-exceptions.utils.js';

const postAvatar = async (req, res) => {
    const imagesUrl = req.cloudinaryUrls;
    try {
        const result = await avatarService.postAvatar({ ...req.body }, imagesUrl, { ...req.user });
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof AvatarNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const getAvatars = async (req, res) => {
    try {
        const result = await avatarService.getAvatars({ ...req.query });
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof AvatarNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const putAvatar = async (req, res) => {
    try {
        const result = await avatarService.putAvatar({ ...req.params }, { ...req.user });
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof AvatarNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const deleteAvatar = async (req, res) => {
    try {
        const result = await avatarService.deleteAvatar({ ...req.params }, { ...req.user });
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof AvatarNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

export { postAvatar, getAvatars, putAvatar, deleteAvatar };