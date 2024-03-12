import { newsModel } from '../models/news.model.js';

export default class News {

    saveNews = async (news) => {
        return await newsModel.create(news);
    };

    getAllNews = async () => {
        return await newsModel.find().lean();
    };

    getNewsById = async (id) => {
        return await newsModel.findById(id).lean();
    };

    update = async (news) => {
        return await newsModel.findByIdAndUpdate({ _id: news._id }, news);
    };
};