import mongoose from "mongoose";

const newsCollection = 'news';

const newsSchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    date: { type: Date },
    active: { type: Boolean, default: true }
});

export const newsModel = mongoose.model(newsCollection, newsSchema);