import { newsManager } from '../dao/manager/index.manager.js';

export default class NewsRepository {

    saveNews = async (news) => {
        const result = await newsManager.saveNews(news);
        return result;
    };

    getAllNews = async () => {
        const result = await newsManager.getAllNews();
        return result;
    };

    getNewsById = async (id) => {
        const result = await newsManager.getNewsById(id);
        return result;
    };

    getIsActive = async () => {
        const result = await newsManager.getIsActive();
        return result;
    };

    update = async (news) => {
        const result = await newsManager.update(news);
        return result;
    };
};