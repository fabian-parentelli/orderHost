import * as configService from '../services/config.service.js';
import { ConfigNotFound } from '../utils/custom-exceptions.utils.js';

const getConfigPage = async (req, res) => {
    try {
        const result = await configService.getConfigPage();
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof ConfigNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const postConfig = async (req, res) => {
    try {
        const result = await configService.postConfig({ ...req.body });
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof ConfigNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

export { getConfigPage, postConfig };