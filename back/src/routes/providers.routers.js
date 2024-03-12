import Router from './routes.js';
import * as providerController from '../controllers/providers.controllers.js';
import { passportEnum } from '../config/enums.config.js';

export default class ProvidersRouter extends Router {
    init() {
        this.post('/', ['ADMIN'], passportEnum.JWT, providerController.newProvider);  
        this.get('/', ['ADMIN'], passportEnum.JWT, providerController.getAllProviders);
        this.get('/:id', ['ADMIN'], passportEnum.JWT, providerController.getProvById);  
        this.put('/', ['ADMIN'], passportEnum.JWT, providerController.updateProvider);  
        this.put('/:id', ['ADMIN'], passportEnum.JWT, providerController.payProvider);  
    };
};