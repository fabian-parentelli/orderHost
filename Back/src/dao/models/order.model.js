import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const orderCollection = 'orders';

const orderSchema = new mongoose.Schema({
    userId: { type: String },
    cart: [
        {
            pid: { type: String },
            quantity: { type: Number },
            price: { type: Number },
        }
    ],
    active: { type: Boolean, default: true },
    date: { type: Date, default: Date.now },
    status: { type: String, default: 'pending' },
    day: { type: String },
    type: { type: String },
});

orderSchema.plugin(mongoosePaginate);

export const orderModel = mongoose.model(orderCollection, orderSchema);