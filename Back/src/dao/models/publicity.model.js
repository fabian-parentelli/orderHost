import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const publicityCollection = 'publicities';

const publicitySchema = new mongoose.Schema({
    name: { type: String },
    link: { type: String },
    type: { type: String },
    img: [{ type: String }],
    active: { type: Boolean, default: true }
});

publicitySchema.plugin(mongoosePaginate);

export const publicityModel = mongoose.model(publicityCollection, publicitySchema);