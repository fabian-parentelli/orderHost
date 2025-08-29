import mongoose from "mongoose";
import { productModel } from '../models/product.model.js';

export default class Product {

    postProduct = async (product) => {
        return await productModel.create(product);
    };

    getProducts = async (query, options) => {
        return await productModel.paginate(query, { ...options, lean: true });
    };

    getById = async (id) => {
        return await productModel.findById(id).lean();
    };

    getAllProducts = async (query, gets = {}) => {
        return await productModel.find(query, gets).lean();
    };

    update = async (product) => {
        return await productModel.findByIdAndUpdate(product._id, product, { lean: true, new: true });
    };

    getOpport = async (notid = []) => {
        return await productModel.aggregate([
            {
                $match: { 
                    _id: { $nin: notid.map(id => new mongoose.Types.ObjectId(id)) }, 
                    active: true, 
                    location: { $ne: 'launch' }
                }
            },
            { $sample: { size: 15 } }
        ]);
    };

};