import { customerModel } from '../models/customer.model.js';

export default class User {

    postCustomer = async (customer) => {
        return await customerModel.create(customer);
    };

    getOne = async (query, get = {}) => {
        return await customerModel.findOne(query, get).lean();
    };

    update = async (customer) => {
        return await customerModel.findByIdAndUpdate(customer._id, customer, { new: true, lean: true });
    };

};