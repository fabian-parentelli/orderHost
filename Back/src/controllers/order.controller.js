import * as orderService from '../services/order.service.js';
import { OrderNotFound } from '../utils/custom-exceptions.utils.js';

const postOrder = async (req, res) => {
    try {
        const result = await orderService.postOrder({ ...req.body });
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof OrderNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const getOrders = async (req, res) => {
    try {
        const result = await orderService.getOrders({ ...req.query });
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof OrderNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const putStatus = async (req, res) => {
    try {
        const result = await orderService.putStatus({ ...req.body });
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof OrderNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

export { postOrder, getOrders, putStatus };