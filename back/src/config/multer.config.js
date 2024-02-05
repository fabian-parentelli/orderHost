import multer from 'multer';

const storage = multer.memoryStorage();

const uploader = multer({
    storage,
    onError: (err, next) => {
        console.log(err);
        next();
    }
});

export { uploader };