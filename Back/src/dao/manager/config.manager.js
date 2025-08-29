import { configModel } from '../models/config.model.js';

export default class Config {

    getConfig = async () => {
        return await configModel.findOne().lean();
    };

    update = async (config) => {
        return await configModel.findByIdAndUpdate(config._id, config, { lean: true, new: true });
    };

};