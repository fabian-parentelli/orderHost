import { upDateManager } from '../dao/manager/index.manager.js';

export default class UpDateRepository {

    upDateCreate = async (data) => {
        const result = await upDateManager.upDateCreate(data);
        return result;
    };

    getUpDate = async () => {
        const result = await upDateManager.getUpDate();
        return result;
    };

    update = async (date) => {
        const result = await upDateManager.update(date);
        return result;
    };
};