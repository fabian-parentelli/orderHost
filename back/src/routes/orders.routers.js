import Router from './routes.js';
import * as orderController from '../controllers/orders.controllers.js';
import { passportEnum } from '../config/enums.config.js';

export default class OrdersRouter extends Router {
    init() {
        this.post('/', ['PUBLIC'], passportEnum.NOTHING, orderController.saveOrder);
        this.get('/', ['USER', 'ADMIN'], passportEnum.JWT, orderController.getOrders);
        this.get('/:id', ['USER', 'ADMIN'], passportEnum.JWT, orderController.getOrderById);
        this.put('/:id', ['ADMIN'], passportEnum.JWT, orderController.updateActive);
    };
};