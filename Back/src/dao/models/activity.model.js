import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const activityCollection = 'activities';

const activitySchema = new mongoose.Schema({
    eventId: { type: String },
    userId: { type: String },
    type: { type: String },
    active: { type: Boolean, default: true },
    date: { type: Date, default: Date.now },
});

activitySchema.plugin(mongoosePaginate);

export const activityModel = mongoose.model(activityCollection, activitySchema);