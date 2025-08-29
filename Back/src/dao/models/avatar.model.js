import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const avatarCollection = 'avatars';

const avatarSchema = new mongoose.Schema({
    name: { type: String },
    folderName: { type: String },
    url: { type: String },
    active: { type: Boolean, default: true },
});

avatarSchema.plugin(mongoosePaginate);

export const avatarModel = mongoose.model(avatarCollection, avatarSchema);