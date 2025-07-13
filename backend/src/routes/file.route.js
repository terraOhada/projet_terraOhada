// Rappel rapide des imports clés
import express from 'express';
import { uploadFile } from '../controllers/file.controller.js';
import upload from '../utils/multerStorage.js';


// ... autres imports et configurations ...

const fileRouter = express.Router();
// Route d'upload
fileRouter.post('/upload-doc', upload.single('documentFile'), uploadFile);

export default fileRouter