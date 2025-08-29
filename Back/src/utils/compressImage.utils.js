import sharp from 'sharp';

const compressImage = async (buffer) => {
    return await sharp(buffer)
        .resize({ width: 1350, withoutEnlargement: true })
        .png({ compressionLevel: 9, quality: 30 })
        .toBuffer();
};

export { compressImage };