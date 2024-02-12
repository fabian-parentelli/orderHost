import { providerManager } from '../dao/manager/index.manager.js';

export default class OrderRepository {

    newProvider = async (provider) => {
        const result = await providerManager.newProvider(provider);
        return result;
    };

    getProvByName = async (name) => {
        const result = await providerManager.getProvByName(name);
        return result;
    };

    getAllProviders = async () => {
        const result = await providerManager.getAllProviders();
        return result;
    };

    getProvById = async (id) => {
        const result = await providerManager.getProvById(id);
        return result;
    };

    updateProvider = async (provider) => {
        const result = await providerManager.updateProvider(provider);
        return result;
    };
};