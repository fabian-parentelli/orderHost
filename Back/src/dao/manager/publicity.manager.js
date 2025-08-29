import { publicityModel } from '../models/publicity.model.js';

export default class Publicity {

    postPublicity = async (product) => {
        return await publicityModel.create(product);
    };

    getPublicities = async (query, page) => {
        return await publicityModel.paginate(query, { page, limit: 12, lean: true });
    };

    getById = async (id) => {
        return await publicityModel.findById(id).lean();
    };

    update = async (publicity) => {
        return await publicityModel.findByIdAndUpdate(publicity._id, publicity, { lean: true, new: true });
    };

};