import { orderManager } from '../dao/manager/index.manager.js';

export default class OrderRepository {

    saveOrder = async (order) => {
        const result = await orderManager.saveOrder(order);
        return result;
    };
    
    getOrders = async (query, page) => {
        const result = await orderManager.getOrders(query, page);
        return result;
    };
    
    getOrderById = async (id) => {
        const result = await orderManager.getOrderById(id);
        return result;
    };
    
    updateOrder = async (order) => {
        const result = await orderManager.updateOrder(order);
        return result;
    };
};