import Router from './routes.js';
import * as upDateController from '../controllers/upDate.controllers.js';
import { passportEnum } from '../config/enums.config.js';

export default class UpDateRouter extends Router {
    init() {
        this.post('/', ['PUBLIC'], passportEnum.NOTHING, upDateController.upDateCreate);
        this.get('/', ['PUBLIC'], passportEnum.NOTHING, upDateController.getUpDate);
        this.put('/', ['ADMIN'], passportEnum.JWT, upDateController.updateUpDate);
    };
};