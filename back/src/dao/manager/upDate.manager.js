import { upDateModel } from '../models/upDate.model.js';

export default class UpDate {

    upDateCreate = async (data) => {
        return upDateModel.create(data);
    };

    getUpDate = async () => {
        return upDateModel.find().lean();
    };

    update = async (date) => {
        return await upDateModel.findByIdAndUpdate({ _id: date._id }, date, { new: true });
    };

};