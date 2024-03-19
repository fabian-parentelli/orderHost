import * as newsService from '../services/news.services.js';
import { NewsNotFound } from '../utils/custom-exceptions.utils.js';

const saveNews = async (req, res) => {
    try {
        const result = await newsService.saveNews({ ...req.body });
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof NewsNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const getAllNews = async (req, res) => {
    try {
        const result = await newsService.getAllNews();
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof NewsNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const getIsActive = async (req, res) => {
    try {
        const result = await newsService.getIsActive();
        if (result) return res.sendSuccess(result);
    } catch (error) {

        console.log(error); //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

        if (error instanceof NewsNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const updateActiveNews = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await newsService.updateActiveNews(id);
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof NewsNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

export { saveNews, getAllNews, getIsActive, updateActiveNews };