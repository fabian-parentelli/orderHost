import { getProductByOrder } from '../dao/dto/order.dto.js';
import { orderManager } from '../dao/manager/index.manager.js';

export default class OrderRepository {

    postOrder = async (order) => {
        const preResult = await orderManager.postOrder(order);
        const result = await getProductByOrder(preResult);
        return result;
    };

    getOrders = async (query, page) => {
        const result = await orderManager.getOrders(query, page);
        return result;
    };

    getById = async (id) => {
        const result = await orderManager.getById(id);
        return result;
    };

    update = async (order) => {
        const result = await orderManager.update(order);
        return result;
    };

};