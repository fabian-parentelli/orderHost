import * as productsService from '../services/products.services.js';
import { ProductsNotFound } from '../utils/custom-exceptions.utils.js';

const createProduct = async (req, res) => {
    const product = req.body;
    const imgName = req.file.originalname;
    const imgUrl = req.cloudinaryUrl;
    try {
        const result = await productsService.createProduct(product, imgName, imgUrl);
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof ProductsNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const getAll = async (req, res) => {
    const { limit = 12, page = 1, category, active = true } = req.query;
    try {
        const result = await productsService.getAll(limit, page, category, active);
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof ProductsNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const getById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await productsService.getById(id);
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof ProductsNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const lookFor = async (req, res) => {
    const { name } = req.params;
    try {
        const result = await productsService.lookFor(name);
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof ProductsNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const getSaleTrue = async (req, res) => {
    try {
        const result = await productsService.getSaleTrue();
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof ProductsNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const setActive = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await productsService.setActive(id);
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof ProductsNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const updateProduct = async (req, res) => {
    const product = req.body;
    let imgName = null;
    let imgUrl;
    if (req.file) {
        imgName = req.file.originalname;
        imgUrl = req.cloudinaryUrl;
    };
    const { id } = req.params;
    try {
        const result = await productsService.updateProduct(product, imgName, imgUrl, id);
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof ProductsNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const updSale = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await productsService.updSale({ ...req.body }, id);
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof ProductsNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const updSaleActive = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await productsService.updSaleActive(id);
        if (result) return res.sendSuccess(result);
    } catch (error) {

        console.log(error); // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

        if (error instanceof ProductsNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

export {
    createProduct, getAll, lookFor, getSaleTrue, setActive, getById, updateProduct, updSale, updSaleActive
};