import moment from 'moment';
import { ProviderNotFound } from '../utils/custom-exceptions.utils.js';
import { providerRepository, docProviderRepository } from '../repositories/index.repositories.js';

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

const payProvider = async (id, pay) => {
    const provider = await providerRepository.getProvById(id);
    if (!provider) throw new ProviderNotFound('No se encuentra el proveedor');
    provider.owe.credit -= pay.amount;
    if (provider.owe.credit <= 0) provider.owe.isOwe = false;
    const doc = {
        customerId: id,
        date:  moment().format('DD-MM-YYYY HH:mm:ss'),
        pay: pay.amount,
        typePay: pay.pay,
        balance: provider.owe.credit
    };
    await docProviderRepository.newDocProvider(doc);
    const result = await providerRepository.updateProvider(provider);
    if (!result) throw new ProviderNotFound('No se puede actualizar la base de datos');
    return { status: 'succes', result };
}; 

export { newProvider, getAllProviders, getProvById, updateProvider, payProvider };