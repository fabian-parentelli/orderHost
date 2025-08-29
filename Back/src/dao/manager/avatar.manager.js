import { avatarModel } from '../models/avatar.model.js';

export default class Avatar {

    postAvatar = async (avatar) => {
        return await avatarModel.create(avatar);
    };

    getAvatars = async (Query, page) => {
        return await avatarModel.paginate(Query, { page, limit: 12, lean: true, sort: { _id: -1 } });
    };

    getById = async (id) => {
        return await avatarModel.findById(id).lean();
    };

    update = async (avatar) => {
        return await avatarModel.findByIdAndUpdate(avatar._id, avatar, { lean: true, new: true });
    };

    deleteAvatar = async (_id) => {
        return await avatarModel.deleteOne({ _id });
    };

};