import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const configCollection = 'configs';

const configSchema = new mongoose.Schema({
    brands: [{ type: String }],
    categories: [{ type: String }],
    subCategories: [{ type: String }],
    families: [{ type: String }],
});

configSchema.plugin(mongoosePaginate);

export const configModel = mongoose.model(configCollection, configSchema);