import Router from './routes.js';
import * as orderController from '../controllers/order.controller.js';
import { passportEnum } from '../config/enums.config.js';

export default class OrderRouter extends Router {
    init() {
        this.post('/', ['PUBLIC'], passportEnum.NOTHING, orderController.postOrder);
        this.get('/', ['USER', 'ADMIN', 'MASTER'], passportEnum.JWT, orderController.getOrders);
        this.put('/', ['ADMIN', 'MASTER'], passportEnum.JWT, orderController.putStatus);
    };
};