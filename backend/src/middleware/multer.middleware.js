// middleware/upload.js
import multer from 'multer';

const pdfUpload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Seuls les fichiers PDF sont acceptés'), false);
        }
    },
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB
    }
}).single('documentFile'); // <-- Le nom du champ doit correspondre à celui utilisé dans le formulaire

export default pdfUpload;