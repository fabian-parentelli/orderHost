import Router from './routes.js';
import * as productController from '../controllers/products.controllers.js';
import { passportEnum } from '../config/enums.config.js';
import { uploader } from '../config/multer.config.js';
import { uploadToCloudinary } from '../config/cloudinary.config.js';

export default class ProductsRouter extends Router {
    init() {
        this.post('/', ['ADMIN'], passportEnum.JWT, uploader.single('file'), uploadToCloudinary, productController.createProduct);
        this.get('/saletrue', ['PUBLIC'], passportEnum.NOTHING, productController.getSaleTrue);
        this.get('/lookfor/:name', ['PUBLIC'], passportEnum.NOTHING, productController.lookFor);
        this.get('/:id', ['PUBLIC'], passportEnum.NOTHING, productController.getById);
        this.get('/', ['PUBLIC'], passportEnum.NOTHING, productController.getAll);
        this.put('/:id', ['ADMIN'], passportEnum.JWT, productController.setActive);
        this.put('/update/:id', ['ADMIN'], passportEnum.JWT, uploader.single('file'), uploadToCloudinary, productController.updateProduct);
        this.put('/updsale/:id', ['ADMIN'], passportEnum.JWT, productController.updSale);
        this.put('/updsaleact/:id', ['ADMIN'], passportEnum.JWT, productController.updSaleActive);
    };
};