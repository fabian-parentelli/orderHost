import Router from './routes.js';
import * as avatarController from '../controllers/avatar.controller.js';
import { passportEnum } from '../config/enums.config.js';
import { multipleUploader } from '../config/multer.config.js';
import { uploadToCloudinary } from '../config/cloudinary.config.js';

export default class AvatarRouter extends Router {
    init() {
        this.post('/', ['MASTER'], passportEnum.JWT, multipleUploader, uploadToCloudinary, avatarController.postAvatar);
        this.get('/', ['PUBLIC'], passportEnum.NOTHING, avatarController.getAvatars);
        this.put('/:id/:password', ['MASTER'], passportEnum.JWT, avatarController.putAvatar);
        this.delete('/:id/:password', ['MASTER'], passportEnum.JWT, avatarController.deleteAvatar);
    };
};