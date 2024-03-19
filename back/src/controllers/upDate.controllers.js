import * as upDateService from '../services/upDate.services.js';
import { UpDateNotFound } from '../utils/custom-exceptions.utils.js';

const upDateCreate = async (req, res) => {
    try {
        const result = await upDateService.upDateCreate();
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof UpDateNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const getUpDate = async (req, res) => {
    try {
        const result = await upDateService.getUpDate();
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof UpDateNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const updateUpDate = async (req, res) => {
    try {
        const result = await upDateService.updateUpDate();
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof UpDateNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

export { upDateCreate, getUpDate, updateUpDate };