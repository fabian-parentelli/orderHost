import * as orderService from '../services/order.service.js';
import { OrderNotFound } from '../utils/custom-exceptions.utils.js';

const postSale = async (req, res) => {
    try {
        const result = await orderService.postSale({ ...req.body });
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof OrderNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

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

const deleteOrder = async (req, res) => {
    try {
        const result = await orderService.deleteOrder({ ...req.params }, { ...req.user });
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof OrderNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

// Borrar --------------------------------------------------------------
const getBorrar = async (req, res) => {
    try {
        const result = await orderService.getBorrar();
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof OrderNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

export { postSale, postOrder, getOrders, putStatus, deleteOrder, getBorrar };