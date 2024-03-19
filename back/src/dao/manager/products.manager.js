import { productModel } from '../models/products.model.js';

export default class Product {

    createProduct = async (product) => {
        return await productModel.create(product);
    };

    getByName = async (name) => {
        return await productModel.findOne({ name }).lean();
    };

    getAll = async (category, limit, page, active) => {
        return await productModel.paginate(category, { limit, page, lean: true });
    };

    getById = async (id) => {
        return await productModel.findById(id).lean();
    };

    update = async (product) => {
        return await productModel.findByIdAndUpdate({ _id: product._id }, product, { new: true });
    };

    lookFor = async (name) => {
        const query = {
            $or: [{ name: { $regex: name, $options: 'i' } }, { description: { $regex: name, $options: 'i' } }]
        };
        return await productModel.paginate(query, { limit: 10, page: 1, lean: true });
    };

    getSaleTrue = async () => {
        return await productModel.find({ 'sale.active': true });
    };
};