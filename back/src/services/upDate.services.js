// import { UpDateNotFound } from '../utils/custom-exceptions.utils.js';
import { upDateRepository } from '../repositories/index.repositories.js';

const upDateCreate = async () => {
    const date = { date: new Date() };
    await upDateRepository.upDateCreate(date);
};

const getUpDate = async () => {
    const result = await upDateRepository.getUpDate();
    // if (!result) throw new UpDateNotFound('No se encuentra ninguna fecha');
    return { status: 'success', result };
};

const updateUpDate = async () => {
    const dateDB = await upDateRepository.getUpDate();
    dateDB[0].date = new Date();
    const result = await upDateRepository.update(dateDB[0]);
    return { status: 'success', result };
};


export { upDateCreate, getUpDate, updateUpDate };