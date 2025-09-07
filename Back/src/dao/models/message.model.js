import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const messageCollection = 'messages';

const messageSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    message: { type: String },
    to: { type: String },
    reason: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    active: { type: Boolean, default: true },
    date: { type: Date, default: Date.now },
});

const autoPopulate = function (next) {
    this.populate('users', '_id name phone email');
    next();
};

messageSchema.pre('find', autoPopulate);
messageSchema.pre('findOne', autoPopulate);
messageSchema.pre('findOneAndUpdate', autoPopulate);

messageSchema.plugin(mongoosePaginate);

export const messageModel = mongoose.model(messageCollection, messageSchema);