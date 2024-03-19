import { productManager } from '../dao/manager/index.manager.js';

export default class ProductRepository {

    createProduct = async (product) => {
        const result = await productManager.createProduct(product);
        return result;
    };

    getByName = async (name) => {
        const result = await productManager.getByName(name);
        return result;
    };

    getAll = async (category, limit, page) => {
        const result = await productManager.getAll(category, limit, page);
        return result;
    };
    
    getById = async (id) => {
        const result = await productManager.getById(id);
        return result;
    };
    
    update = async (product) => {
        const result = await productManager.update(product);
        return result;
    };

    lookFor = async (name) => {
        const result = await productManager.lookFor(name);
        return result;
    };

    getSaleTrue = async () => {
        const result = await productManager.getSaleTrue();
        return result;
    };
};