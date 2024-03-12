import * as providerService from '../services/providers.services.js';
import { ProviderNotFound } from '../utils/custom-exceptions.utils.js';

const newProvider = async (req, res) => {
    try {
        const result = await providerService.newProvider({ ...req.body });
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof ProviderNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const getAllProviders = async (req, res) => {
    try {
        const result = await providerService.getAllProviders();
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof ProviderNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const getProvById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await providerService.getProvById(id);
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof ProviderNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const updateProvider = async (req, res) => {
    try {
        const result = await providerService.updateProvider({ ...req.body });
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof ProviderNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const payProvider = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await providerService.payProvider(id, { ...req.body });
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof ProviderNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

export { newProvider, getAllProviders, getProvById, updateProvider, payProvider };