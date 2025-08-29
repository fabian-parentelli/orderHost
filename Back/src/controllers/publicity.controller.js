import * as publicityService from '../services/publicity.service.js';
import { ProductNotFound } from '../utils/custom-exceptions.utils.js';

const postPublicity = async (req, res) => {
    const imagesUrl = req.cloudinaryUrls;
    try {
        const result = await publicityService.postPublicity({ ...req.body }, imagesUrl);
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof ProductNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const getPublicities = async (req, res) => {
    try {
        const result = await publicityService.getPublicities({ ...req.query });
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof ProductNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const putPublicity = async (req, res) => {
    try {
        const result = await publicityService.putPublicity({ ...req.body });
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof ProductNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

export { postPublicity, getPublicities, putPublicity };