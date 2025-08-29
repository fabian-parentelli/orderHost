import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const productCollection = 'products';

const productSchema = new mongoose.Schema({
    name: { type: String },
    brand: { type: String },
    description: { type: String },
    unit: { type: String },
    price: { type: Number },
    quantity: { type: Number },
    box: { type: Number },
    discount: { type: Number },
    category: { type: String },
    subCategory: { type: String },
    img: { type: String },
    family: { type: String },
    stock: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    cost: { type: Number },
    minimum: { type: Number, default: 1 },
    location: { type: String, default: 'none' },
});

productSchema.plugin(mongoosePaginate);

export const productModel = mongoose.model(productCollection, productSchema);