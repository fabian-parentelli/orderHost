import { userManager } from '../dao/manager/index.manager.js';

export default class UserRepository {

    register = async (user) => {
        const result = await userManager.register(user);
        return result;
    };

    exists = async (email) => {
        const result = await userManager.exists(email);
        return result;
    };

    getById = async (id) => {
        const result = await userManager.getById(id);
        return result;
    };

    getByEmail = async (email) => {
        const result = await userManager.getByEmail(email);
        return result;
    };

    update = async (user) => {
        const result = await userManager.update(user);
        return result;
    };

    getByIdPass = async (passId) => {
        const result = await userManager.getByIdPass(passId);
        return result;
    };

    getUsers = async (query, page) => {
        const result = await userManager.getUsers(query, page);
        return result;
    };

    getAutoComplete = async (query) => {
        const result = await userManager.getAutoComplete(query);
        return result;
    };

    getForRole = async (id) => {
        const result = await userManager.getForRole(id);
        return result;
    };

};