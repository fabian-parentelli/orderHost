import { providerModel } from '../models/providers.model.js';

export default class Provider {

    newProvider = async (provider) => {
        return providerModel.create(provider);
    };

    getProvByName = async (name) => {
        return providerModel.findOne({ name: name });
    };

    getAllProviders = async () => {
        return providerModel.find().lean();
    };

    getProvById = async (id) => {
        return providerModel.findById(id).lean();
    };

    updateProvider = async (provider) => {
        return providerModel.findByIdAndUpdate({ _id: provider._id }, provider);
    };
};