import Router from './routes.js';
import * as configController from '../controllers/config.controller.js';
import { passportEnum } from '../config/enums.config.js';

export default class ConfigRouter extends Router {
    init() {
        this.get('/', ['PUBLIC'], passportEnum.NOTHING, configController.getConfigPage);
        this.put('/', ['MASTER'], passportEnum.JWT, configController.postConfig);
    };
};