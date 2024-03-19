import { newsRepository } from '../repositories/index.repositories.js';
import { NewsNotFound } from '../utils/custom-exceptions.utils.js';

const saveNews = async (news) => {
    news.date = new Date();
    const result = await newsRepository.saveNews(news);
    if (!result) throw new NewsNotFound('No se puede agregar el mensaje');
    return { status: 'success', result };
};

const getAllNews = async () => {
    const result = await newsRepository.getAllNews();
    if (!result) throw new NewsNotFound('No se puede acceder a los mensajes');
    return { status: 'success', result };
};

const getIsActive = async () => {
    const result = await newsRepository.getIsActive();
    if (!result) return { status: 'error', error: 'No hay anuncios activos' }
    return { status: 'success', result };
};

const updateActiveNews = async (id) => {
    const newsDb = await newsRepository.getNewsById(id);
    if (!newsDb) throw new NewsNotFound('No se encuentra el mensaje');
    newsDb.active = !newsDb.active;
    const result = await newsRepository.update(newsDb);
    if (!result) throw new NewsNotFound('No se puede modificar el anuncio');
    return { status: 'success', result };
};

export { saveNews, getAllNews, getIsActive, updateActiveNews };