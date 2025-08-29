import { userModel } from '../models/users.model.js';

export default class User {

    register = async (user) => {
        return await userModel.create(user);
    };

    exists = async (email) => {
        return await userModel.exists({ email }) !== null;
    };

    getById = async (id) => {
        return await userModel.findById(id).lean();
    };

    getByEmail = async (email) => {
        return await userModel.findOne({ email }).lean();
    };

    update = async (user) => {
        return await userModel.findByIdAndUpdate(user._id, user, { lean: true, new: true });
    };

    getByIdPass = async (passId) => {
        return await userModel.findOne({ passId }, { email: 1, _id: 0 });
    };

    getUsers = async (query, page) => {
        const baseFilter = [{ role: { $ne: 'master' } }];
        if (query.role) {
            baseFilter.push({ role: query.role });
            delete query.role;
        };
        return await userModel.paginate({ $and: [...baseFilter, query] },
            { page, limit: 12, lean: true, sort: { created: -1 }, select: '-password' }
        );
    };

    getAutoComplete = async (query) => {
        return await userModel.find(query, { name: 1, _id: 1 });
    };

    getForRole = async (_id) => {
        return await userModel.findOne({ _id }, { password: 1, role: 1 });
    };

};