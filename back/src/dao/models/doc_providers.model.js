import mongoose from "mongoose";
import mongosePaginate from 'mongoose-paginate-v2';

const docProviderCollection = 'docproviders';

const docProviderSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'providers' },
    date: { type: String },
    pay: { type: Number },
    typePay: { type: String },
    balance: { type: Number }
});

docProviderSchema.pre('find', function () {
    this.populate('cart.product')
});

docProviderSchema.statics.findByIdAndPopulate = async function (id) {
    return this.findById(id).populate('cart.product').exec();
};

docProviderSchema.plugin(mongosePaginate);

export const docProviderModel = mongoose.model(docProviderCollection, docProviderSchema);