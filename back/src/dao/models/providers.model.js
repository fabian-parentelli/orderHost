import mongoose from "mongoose";

const providerCollection = 'providers';

const providerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    active: { type: Boolean, default: true },
    owe: {
        isOwe: { type: Boolean, default: false },
        credit: { type: Number, default: 0 },
        // purchase: { type: mongoose.Schema.Types.ObjectId, ref: 'purchaseOrder' }
    }
});

// providerSchema.pre('find', function () {
//     this.populate('owe.purchase')
// });

// providerSchema.statics.findByIdAndPopulate = async function (id) {
//     return this.findById(id).populate('owe.purchase').exec();
// };

export const providerModel = mongoose.model(providerCollection, providerSchema);