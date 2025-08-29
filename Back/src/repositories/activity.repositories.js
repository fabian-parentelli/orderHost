import { activityManager } from '../dao/manager/index.manager.js';

export default class ActivityRepository {

    create = async (activity) => {
        const result = await activityManager.create(activity);
        return result;
    };

};