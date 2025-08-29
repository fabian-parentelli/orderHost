import { publicityManager } from '../dao/manager/index.manager.js';

export default class PublicityRepository {

    postPublicity = async (publicity) => {
        const result = await publicityManager.postPublicity(publicity);
        return result;
    };

    getPublicities = async (query, page) => {
        const result = await publicityManager.getPublicities(query, page);
        return result;
    };

    getById = async (id) => {
        const result = await publicityManager.getById(id);
        return result;
    };

    update = async (publicity) => {
        const result = await publicityManager.update(publicity);
        return result;
    };

};