import multer from 'multer';

const storage = multer.memoryStorage();

const uploader = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/") || file.mimetype === "application/pdf") {
            cb(null, true);
        } else {
            cb(new Error("Formato no permitido. Solo se aceptan imágenes y PDFs."));
        }
    },
    onError: (err, next) => {
        console.log(err);
        next();
    }
});

const multipleUploader = uploader.array('files', 3);

export { multipleUploader };