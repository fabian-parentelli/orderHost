import Router from './routes.js';
import * as messageController from '../controllers/messge.controller.js';
import { passportEnum } from '../config/enums.config.js';

export default class MessageRouter extends Router {
    init() {
        this.post('/', ['PUBLIC'], passportEnum.NOTHING, messageController.postMessage);;
    };
};