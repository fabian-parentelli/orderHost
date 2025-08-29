import * as productService from '../services/products.service.js';
import { ProductNotFound } from '../utils/custom-exceptions.utils.js';

const postProduct = async (req, res) => {
    const imagesUrl = req.cloudinaryUrls;
    try {
        const result = await productService.postProduct({ ...req.body }, imagesUrl);
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof ProductNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const getProducts = async (req, res) => {
    try {
        const result = await productService.getProducts({ ...req.query });
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof ProductNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const putProductImg = async (req, res) => {
    const imagesUrl = req.cloudinaryUrls;
    try {
        const result = await productService.putProductImg({ ...req.body }, imagesUrl);
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof ProductNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const putOpportinity = async (req, res) => {
    try {
        const result = await productService.putOpportinity({ ...req.body }, { ...req.user });
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof ProductNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const putProduct = async (req, res) => {
    try {
        const result = await productService.putProduct({ ...req.body });
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof ProductNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

export { postProduct, getProducts, putProductImg, putOpportinity, putProduct };