import { configRepository, productRepository } from "../repositories/index.repositories.js";
import { ConfigNotFound } from '../utils/custom-exceptions.utils.js';

const getConfigPage = async () => {
    const result = await configRepository.getConfig();
    if (!result) throw new ConfigNotFound('Error al tarer las configuraciónes');
    const products = await productRepository.getAllProducts({ active: true }, { name: 1, brand: 1, description: 1 });
    if (!products) throw new ConfigNotFound('Error al tarer los productos');
    result.products = products;
    return { status: 'success', result };
};

const postConfig = async (body) => {
    const config = await configRepository.getConfig();
    if (!config) throw new ConfigNotFound('Error al tarer las configuraciónes');
    const result = await configRepository.update({ ...config, ...body });
    if (!result) throw new ConfigNotFound('Error al tarer las configuraciónes');
    return { status: 'success', result };
};

export { getConfigPage, postConfig };