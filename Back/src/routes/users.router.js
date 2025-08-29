import Router from './routes.js';
import * as userController from '../controllers/users.controller.js';
import { passportEnum } from '../config/enums.config.js';
import { multipleUploader } from '../config/multer.config.js';
import { uploadToCloudinary } from '../config/cloudinary.config.js';

export default class UserRouter extends Router {
    init() {
        this.post('/register', ['PUBLIC'], passportEnum.NOTHING, userController.register);
        this.post('/login', ['PUBLIC'], passportEnum.NOTHING, userController.login);
        this.post('/recover_password', ['PUBLIC'], passportEnum.NOTHING, userController.recoverPassword);
        this.post('/', ['ADMIN', 'MASTER'], passportEnum.JWT, multipleUploader, uploadToCloudinary, userController.postUser);
        this.get('/current', ['PUBLIC'], passportEnum.JWT, userController.current);
        this.get('/inter_pass/:id', ['PUBLIC'], passportEnum.NOTHING, userController.interPass);
        this.get('/ac', ['ADMIN', 'MASTER'], passportEnum.JWT, userController.getAutoComplete);
        this.get('/', ['MASTER', 'ADMIN'], passportEnum.JWT, userController.getUsers);
        this.put('/new_password', ['PUBLIC'], passportEnum.JWT, userController.newPassword);
        this.put('/image', ['USER', 'ADMIN', 'MASTER'], passportEnum.JWT, multipleUploader, uploadToCloudinary, userController.updateImg);
        this.put('/avatar', ['USER', 'ADMIN', 'MASTER'], passportEnum.JWT, userController.putAvatar);
        this.put('/delete', ['USER', 'ADMIN', 'MASTER'], passportEnum.JWT, userController.deleteAvatar);
        this.put('/', ['USER', 'ADMIN', 'MASTER'], passportEnum.JWT, userController.update);
    };
};