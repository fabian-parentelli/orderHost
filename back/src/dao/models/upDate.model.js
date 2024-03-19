import mongoose from "mongoose";

const upDateCollection = 'update';

const upDateSchema = new mongoose.Schema({
    date: { type: Date }
});

export const upDateModel = mongoose.model(upDateCollection, upDateSchema);