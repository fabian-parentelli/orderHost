import Router from './routes.js';
import * as publicityController from '../controllers/publicity.controller.js';
import { passportEnum } from '../config/enums.config.js';
import { multipleUploader } from '../config/multer.config.js';
import { uploadToCloudinary } from '../config/cloudinary.config.js';

export default class PublicityRouter extends Router {
    init() {
        this.post('/', ['MASTER'], passportEnum.JWT, multipleUploader, uploadToCloudinary, publicityController.postPublicity);
        this.get('/', ['PUBLIC'], passportEnum.NOTHING, publicityController.getPublicities);
        this.put('/', ['MASTER'], passportEnum.JWT, publicityController.putPublicity);
    };
};