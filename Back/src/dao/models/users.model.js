import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const userCollection = 'users';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    birthday: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String },
    location: {
        city: { type: String },
        address: { type: String }
    },
    avatar: [{ type: String }],
    active: { type: Boolean, default: true },
    phone: { type: String },
    role: { type: String, default: 'user' },
    passId: { type: String },
    created: { type: Date, default: Date.now },
    favorites: [{ type: String, default: [] }],
    description: { type: String }
});

userSchema.plugin(mongoosePaginate);

export const userModel = mongoose.model(userCollection, userSchema);