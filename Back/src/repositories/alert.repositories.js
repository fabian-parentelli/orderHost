import { alertManager } from '../dao/manager/index.manager.js';

export default class AlertRepository {

    create = async (alert) => {
        const result = await alertManager.create(alert);
        return result;
    };

};