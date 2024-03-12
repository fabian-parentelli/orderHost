import { v2 as cloudinary } from 'cloudinary';
import config from './dotEnv.config.js'

cloudinary.config({
    cloud_name: config.cloudName,
    api_key: config.apiKey,
    api_secret: config.apiSecret
});

const uploadToCloudinary = (req, res, next) => {
    if (!req.file) {
        req.cloudinaryUrl = null;
        return next();
    }

    cloudinary.uploader.upload_stream({ folder: 'products' }, (error, result) => {
        if (error) {
            console.error('Error al cargar la imagen a Cloudinary:', error);
            return next(error);
        }

        req.cloudinaryUrl = result.secure_url;
        next();
    }).end(req.file.buffer);
};

const deleteImg = async (publicId) => {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
};

const getPublicId = (url) => {
    const regex = /\/v\d+\/(.+)\.\w+/;
    const match = url.match(regex);
    if (match && match.length > 1) {
        return match[1]; 
    } else {
        throw new Error('URL de Cloudinary no válida');
    };
};

export { uploadToCloudinary, deleteImg, getPublicId };