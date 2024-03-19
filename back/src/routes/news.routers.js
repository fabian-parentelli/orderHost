import Router from './routes.js';
import * as newsController from '../controllers/news.controllers.js';
import { passportEnum } from '../config/enums.config.js';

export default class NewsRouter extends Router {
    init() {
        this.post('/', ['ADMIN'], passportEnum.JWT, newsController.saveNews);
        this.get('/', ['PUBLIC'], passportEnum.NOTHING, newsController.getAllNews);
        this.get('/isActive', ['PUBLIC'], passportEnum.NOTHING, newsController.getIsActive);
        this.put('/:id', ['ADMIN'], passportEnum.JWT, newsController.updateActiveNews);
    };
};