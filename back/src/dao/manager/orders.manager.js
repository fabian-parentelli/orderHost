import { orderModel } from '../models/orders.model.js';

export default class Order {

    saveOrder = async (order) => {
        return await orderModel.create(order);
    };

    getOrders = async (query, page) => {
        return await orderModel.paginate(query, { limit: 10, page, sort: { date: -1 }, lean: true });
    };

    getOrderById = async (id) => {
        return await orderModel.findByIdAndPopulate(id);
    };

    updateOrder = async (order) => {
        return await orderModel.findByIdAndUpdate({ _id: order._id }, order, { new: true });
    };
};