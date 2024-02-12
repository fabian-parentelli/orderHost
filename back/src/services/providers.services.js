import { providerRepository } from '../repositories/index.repositories.js';
import { ProviderNotFound } from '../utils/custom-exceptions.utils.js';

const newProvider = async (provider) => {
    const providerDB = await providerRepository.getProvByName(provider.name);
    if (providerDB) throw new ProviderNotFound('Ya existe un proveedor con ese nombre');
    const result = await providerRepository.newProvider(provider);
    if (!result) throw new ProviderNotFound('No se puede agregar un proveedor en este momento');
    return { status: 'success', result };
};

const getAllProviders = async () => {
    const providers = await providerRepository.getAllProviders();
    if (!providers) throw new ProviderNotFound('No se puede acceder a los proveedores');
    return { status: 'success', providers };
};

const getProvById = async (id) => {
    const provider = await providerRepository.getProvById(id);
    if (!provider) throw new ProviderNotFound('No se encuentra al proveedor');
    return { status: 'success', provider };
};

const updateProvider = async (provider) => {
    const providerDB = await providerRepository.getProvById(provider._id);
    if (!providerDB) throw new ProviderNotFound('No se encuentra el proveedor');
    const newProvider = { ...providerDB, ...provider };
    const result = await providerRepository.updateProvider(newProvider);
    if (!result) throw new ProviderNotFound('No se puede modificar el productos');
    return { status: 'success', result };
};

export { newProvider, getAllProviders, getProvById, updateProvider };