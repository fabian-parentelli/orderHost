import { activityModel } from '../models/activity.model.js';

export default class Activity {

    create = async (activity) => {
        return await activityModel.create(activity);
    };

};