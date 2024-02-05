import * as orderService from '../services/orders.services.js';
import { OredrNotFound } from '../utils/custom-exceptions.utils.js';

const saveOrder = async (req, res) => {
    try {
        const result = await orderService.saveOrder({ ...req.body });
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof OredrNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const getOrders = async (req, res) => {
    const { active = true, page = 1 } = req.query;
    const { user } = req.user;
    try {
        const result = await orderService.getOrders(active, page, user);
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof OredrNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const getOrderById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await orderService.getOrderById(id);
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof OredrNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const updateActive = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await orderService.updateActive(id);
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof OredrNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

export { saveOrder, getOrders, getOrderById, updateActive }; 