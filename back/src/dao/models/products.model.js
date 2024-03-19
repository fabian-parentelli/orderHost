import mongoose from "mongoose";
import mongosePaginate from 'mongoose-paginate-v2';

const productCollection = 'productsBeta';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    minQuantity: { type: Number, required: true },
    quantity: { type: Number, default: 1 },
    price: { type: Number, required: true },
    img: {
        imgName: { type: String },
        imgUrl: { type: String }
    },
    type: { type: String, required: true },
    active: { type: Boolean, default: true },
    description: { type: String },
    category: { type: String },
    sale: {
        active: { type: Boolean },
        priceSale: { type: Number }
    }
});

productSchema.plugin(mongosePaginate);

export const productModel = mongoose.model(productCollection, productSchema);