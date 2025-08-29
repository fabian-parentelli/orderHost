import { orderModel } from '../models/order.model.js';

export default class Order {

    postOrder = async (order) => {
        return await orderModel.create(order);
    };

    getOrders = async (query, page) => {
        return await orderModel.paginate(query, { page, limit: 12, lean: true, sort: { date: -1 } });
    };

    getById = async (id) => {
        return await orderModel.findById(id).lean();
    };

    update = async (order) => {
        return await orderModel.findByIdAndUpdate(order._id, order, { lean: true, new: true });
    };
    
};