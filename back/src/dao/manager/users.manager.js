import { userModel } from '../models/users.model.js';

export default class User {

    getByEmail = async (email) => {
        return await userModel.findOne({ email }).lean();
    };

    register = async (user) => {
        return await userModel.create(user);
    };

    updateUser = async (user) => {
        return await userModel.findOneAndUpdate({ _id: user._id }, user, { new: true });
    };

    getById = async (id) => {
        return await userModel.findById(id).lean();
    };

    getByIdPass = async (id) => {
        return await userModel.findOne({ passId: id }).lean();
    };
};