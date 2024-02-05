import mongoose from "mongoose";
import mongosePaginate from 'mongoose-paginate-v2';

const orderCollection = 'orders';

const orderSchema = new mongoose.Schema({
    cart: {
        type: [
            {
                product: { type: mongoose.Schema.Types.ObjectId, ref: 'productsBeta' },
                quantity: { type: Number },
                price: { type: Number },
            }
        ],
        default: []
    },
    customer: {
        type: Object,
        of: mongoose.Schema.Types.Mixed
    },
    date: { type: String },
    active: { type: Boolean, default: true }
});

orderSchema.pre('find', function () {
    this.populate('cart.product')
});

orderSchema.statics.findByIdAndPopulate = async function (id) {
    return this.findById(id).populate('cart.product').exec();
};

orderSchema.plugin(mongosePaginate);

export const orderModel = mongoose.model(orderCollection, orderSchema);