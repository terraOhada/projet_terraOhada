import db from "../utils/config.js";

import path from 'path';
import fs from 'fs';
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from "../utils/constants.js";

export const uploadFile = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: 'Aucun fichier n\'a été uploadé.'
        });
    }

    // Vérification du type PDF
    if (!ALLOWED_FILE_TYPES.includes(req.file.mimetype)) {
        return res.status(400).json({
            success: false,
            message: 'Seuls les fichiers PDF sont acceptés.'
        });
    }

    // Vérification de la taille du fichier
    if (req.file.size > MAX_FILE_SIZE) {
        return res.status(400).json({
            success: false,
            message: `Le fichier est trop volumineux. Taille maximale: ${MAX_FILE_SIZE / 1024 / 1024}MB`
        });
    }

    try {

        // Configuration
        const uploadDir = 'uploads/documents/'; // Dossier dans public/
        const baseUrl = `${req.protocol}://${req.get('host')}`; // URL de base
        // Créer le dossier de destination s'il n'existe pas

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Générer un nom de fichier unique
        const fileExt = path.extname(req.file.originalname);
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}${fileExt}`;
        const filePath = path.join(uploadDir, fileName);
        const fileUrl = `${baseUrl}/documents/${fileName}`; // URL accessible

        // Enregistrer le fichier sur le disque
        fs.writeFileSync(filePath, req.file.buffer);

        // Enregistrement en base de données
        const newDocument = await db.document.create({
            data: {
                nomFichier: req.file.originalname,
                urlFichier: fileUrl, // Chemin local au lieu de l'URL
                taille: req.file.size,
                typeMime: req.file.mimetype,
                dateUpload: new Date()
            }
        });

        res.status(201).json({
            success: true,
            message: 'PDF uploadé avec succès',
            document: {
                id: newDocument.id,
                nom: newDocument.nomFichier,
                chemin: newDocument.urlFichier,
                taille: newDocument.taille
            }
        });

    } catch (error) {
        console.error('Erreur upload PDF:', error);

        res.status(500).json({
            success: false,
            message: 'Erreur lors de l\'upload du PDF',
            ...(process.env.NODE_ENV === 'development' && {
                error: error.message
            })
        });
    }
};