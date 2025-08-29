import { alertsModel } from '../models/alert.model.js';

export default class Alerts {

    create = async (alert) => {
        return await alertsModel.create(alert)
    };

};