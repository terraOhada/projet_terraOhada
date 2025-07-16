// Rappel rapide des imports clés
import express from 'express';
import { uploadFile, uploadPhoto } from '../controllers/file.controller.js';
import upload, { uploadImage } from '../utils/multerStorage.js';


// ... autres imports et configurations ...

const fileRouter = express.Router();
// Route d'upload
fileRouter.post('/upload-doc', upload.single('documentFile'), uploadFile);
fileRouter.post('/upload-photo/:userId', uploadImage.single('image'), uploadPhoto);

export default fileRouter