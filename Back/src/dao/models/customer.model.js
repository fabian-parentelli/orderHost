import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const customerCollection = 'customers';

const customerSchema = new mongoose.Schema({
    name: { type: String, required: true, lowercase: true },
    email: { type: String },
    location: {
        city: { type: String },
        address: { type: String }
    },
    active: { type: Boolean, default: true },
    phone: { type: String },
});

customerSchema.plugin(mongoosePaginate);

export const customerModel = mongoose.model(customerCollection, customerSchema);