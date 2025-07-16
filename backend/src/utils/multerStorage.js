import multer from 'multer';
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from './constants.js';


const upload = multer({
    storage: multer.memoryStorage(), // Stockage en mémoire pour traitement
    limits: {
        fileSize: MAX_FILE_SIZE // Utilise la même constante
    },
    fileFilter: (req, file, cb) => {
        if (ALLOWED_FILE_TYPES.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Type de fichier non autorisé'), false);
        }
    }
});

export default upload;

export const uploadImage = multer({ dest: 'uploads/photos' });