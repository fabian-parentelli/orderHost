import { v2 as cloudinary } from 'cloudinary';
import config from './dotEnv.config.js';
import { compressImage } from '../utils/compressImage.utils.js';

cloudinary.config({
    cloud_name: config.cloudName,
    api_key: config.apiKey,
    api_secret: config.apiSecret
});

const uploadToCloudinary = async (req, res, next) => {

    if (!req.files || req.files.length === 0) {
        req.cloudinaryUrls = [];
        return next();
    };

    const { folderName } = req.body;

    const uploadPromises = req.files.map(async (file) => {
        try {
            const options = {
                folder: folderName,
                resource_type: file.mimetype === "application/pdf" ? "raw" : "image"
            };

            let fileBuffer = file.buffer;

            if (file.mimetype.startsWith("image/")) {
                fileBuffer = await compressImage(file.buffer);
            }

            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    options,
                    (error, result) => {
                        if (error) {
                            console.error('Error al cargar a Cloudinary:', error);
                            reject(error);
                        } else resolve(result.secure_url);
                    }
                );
                stream.end(fileBuffer);
            });
        } catch (error) {
            console.error('Error en la subida:', error);
            throw error;
        }
    });

    try {
        const cloudinaryUrls = await Promise.all(uploadPromises);
        req.cloudinaryUrls = cloudinaryUrls;
        next();
    } catch (error) {
        next(error);
    }
};

const deleteImg = async (publicId) => {
    return await cloudinary.uploader.destroy(publicId);
};

const getPublicId = (url) => {
    const regex = /\/upload\/(?:v\d+\/)?(.+?)(?:\.\w+)?$/;
    const match = url.match(regex);
    if (match && match[1]) return match[1];
    throw new Error('URL de Cloudinary no válida');
};

export { uploadToCloudinary, deleteImg, getPublicId };