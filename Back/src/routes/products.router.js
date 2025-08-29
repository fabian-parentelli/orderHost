import Router from './routes.js';
import * as productController from '../controllers/product.controller.js';
import { passportEnum } from '../config/enums.config.js';
import { multipleUploader } from '../config/multer.config.js';
import { uploadToCloudinary } from '../config/cloudinary.config.js';

export default class ProductRouter extends Router {
    init() {
        this.post('/', ['MASTER'], passportEnum.JWT, multipleUploader, uploadToCloudinary, productController.postProduct);
        this.get('/', ['PUBLIC'], passportEnum.NOTHING, productController.getProducts);
        this.put('/img', ['MASTER'], passportEnum.JWT, multipleUploader, uploadToCloudinary, productController.putProductImg);
        this.put('/opp', ['MASTER'], passportEnum.JWT, productController.putOpportinity);
        this.put('/', ['MASTER'], passportEnum.JWT, productController.putProduct);
    };
};