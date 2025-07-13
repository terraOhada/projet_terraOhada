// src/middleware/authMiddleware.js

import jwt from "jsonwebtoken";
// Pas besoin de dotenv.config() ici si déjà fait dans le fichier d'entrée principal
// import dotenv from 'dotenv';
// dotenv.config(); // <-- À supprimer d'ici si déjà dans server.js/app.js

export const authMiddleware = async (req, res, next) => {
    // Vérification cruciale : le secret JWT doit être défini
    if (!process.env.JWT_SECRET) {
        console.error("Configuration d'erreur : JWT_SECRET n'est pas défini. Impossible de vérifier le token.");
        return res.status(500).json({ success: false, message: "Erreur de configuration serveur." });
    }

    const token = req.cookies?.terra_cookie || req.headers.authorization?.split(" ")[1];

    // console.log("Token reçu par middleware:", token); // Laissez ceci pour le débogage actuel

    if (!token) {
        return res.status(401).json({ success: false, message: 'Accès non autorisé : Veuillez vous connecter.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // console.log("Token décodé:", decoded); // Laissez ceci pour le débogage actuel

        if (decoded && decoded.id) {
            req.userId = decoded.id;
        } else {
            return res.status(403).json({ success: false, message: 'Token invalide ou incomplet : Veuillez vous reconnecter.' });
        }

        next();

    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            console.error("Erreur JWT : Token invalide ou signature incorrecte.", error.message); // Log plus de détails
            return res.status(401).json({ success: false, message: 'Accès non autorisé : Token invalide.' });
        } else if (error instanceof jwt.TokenExpiredError) {
            console.error("Erreur JWT : Token expiré.", error.message);
            return res.status(401).json({ success: false, message: 'Accès non autorisé : Votre session a expiré. Veuillez vous reconnecter.' });
        } else {
            console.error("Erreur inattendue dans l'authentification:", error);
            return res.status(500).json({ success: false, message: 'Erreur interne du serveur lors de l\'authentification.' });
        }
    }
};