
import bcrypt from 'bcryptjs';
import transporter from "../nodemailer/nodemailer.js";

import db from '../utils/config.js';
import { generateAndSetCookies } from '../utils/geneateCookie.js';
import { EMAIL_BIENVENUE, EMAIL_REINITIALISATION_CODE, EMAIL_RESET_PASSWORD, EMAIL_VERIFICATION_CODE } from '../nodemailer/template.js';

const FRONTEND_URL = process.env.FRONTEND_URL || 'https://mvp-terraohada-frontend.vercel.app';

export const register = async (req, res) => {
    // recuperer les informations de l'utilisateur
    const { nom, prenom, email, password } = req.body;

    // console.log("body", req.body);

    // Vérifier si les informations sont valides
    if (!nom || !email || !password || !prenom) {
        return res.status(400).json({ success: false, message: 'Tous les champs sont requis' });
    }

    // console.log(req.body);

    try {
        // Vérifier si l'email est déjà utilisé
        const user = await db.user.findUnique({
            where: {
                email
            }
        });
        if (user) {
            return res.status(400).json({ success: false, message: 'Cet email est déjà utilisé' });
        }

        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 12);

        // Créer un nouveau utilisateur
        const newUser = await db.user.create({
            data: { nom, prenom, email, password: hashedPassword },
        });

        // générer un token et mettre dans les cookies
        generateAndSetCookies(newUser.id, res)

        // console.log(terra_token)

        // envoyer un email 
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Bienvenue sur note notre plateforme Terra Ohada',
            html: EMAIL_BIENVENUE.replace("{{FRONTEND_URL}}", FRONTEND_URL).replace("{{nom_utilisateur}}", newUser.nom).replaceAll("{{id_user}}", newUser.id),
        }

        await transporter.sendMail(mailOptions)

        // renvoyer les informations de l'utilisateur
        return res.status(201).json({ success: true, message: "Inscription réussie 👏" });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, message: "Erreur interne du serveur lors de l'inscription" });
    }

}

export const login = async (req, res) => {
    // Récupérer les informations de connexion
    const { email, password } = req.body;

    // console.log("password", password);

    // Vérifier si les informations sont valides
    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Tous les champs sont requis' });
    }

    try {
        // Vérifier si l'utilisateur existe
        const user = await db.user.findFirst({
            where: {
                email
            },

        });

        if (!user) {
            return res.status(404).json({ success: false, message: "l'email est invalide" });
        }

        if (!user.isAccountVerified) {
            return res.status(400).json({ success: false, message: "Votre compte n'est pas encore vérifié. Veuillez vérifier votre email pour le code de vérification." });
        }

        // Vérifier si le mot de passe est correct
        const isPasswordValid = await bcrypt.compare(password, user.password);

        // console.log(isPasswordValid)

        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: 'Le mot de passe est incorrect' });
        }

        // générer un token et mettre dans les cookies
        generateAndSetCookies(user.id, res)

        // console.log(token_vendor)

        // renvoyer les informations de l'utilisateur
        return res.status(201).json({
            success: true, message: "Connexion réussie 👏", data: {
                id: user.id,
                nom: user.nom,
                prenom: user.prenom,
                email: user.email,
                role: user.role,
                photo: user.photo,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                isAccountVerified: user.isAccountVerified,
            }
        });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, message: 'Erreur interne du serveur lors de la connexion' });
    }
}

export const logout = async (req, res) => {
    res.clearCookie('terra_cookie', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Strict',
    });
    return res.status(200).json({ success: true, message: 'Déconnexion réussie 🤚' });
}

export const sendVerifyOtp = async (req, res) => {
    try {
        const { userId } = req.params;
        // console.log("userId", userId);
        const user = await db.user.findUnique({
            where: { id: userId }
        });

        // si l'email est déjà vérifié alors renvoyer un message de confirmation
        if (user.isAccountVerified) {
            return res.status(200).json({ success: true, message: "Votre compte est déjà vérifié" });
        }

        // generer le otp
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // console.log(otp)
        const ExpireAt = Date.now() + 24 * 60 * 60 * 1000;

        await db.user.update({
            where: { id: userId },
            data: { verifyOtp: otp, verifyOtpExpireAt: ExpireAt }
        });

        // envoyer le otp par email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Vérification de votre compte',
            html: EMAIL_VERIFICATION_CODE.replace("{{nom_utilisateur}}", user.nom).replace("{{code_de_verification}}", otp),

        }
        await transporter.sendMail(mailOptions)

        return res.status(200).json({ success: true, message: "Votre code de vérification a été envoyé par email" });


    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, message: "Erreur interne du serveur lors de la vérification de l'email" });
    }
}

export const verifyAccount = async (req, res) => {

    const { userId, otp } = req.body;

    if (!userId || !otp) {
        return res.status(400).json({ success: false, message: "Tous les champs sont requis" });
    }
    try {
        const user = await db.user.findUnique({
            where: { id: userId }
        });
        if (!user) {
            return res.status(404).json({ success: false, message: "Utilisateur non trouvé" });
        }

        if (user.verifyOtp === "" || user.verifyOtp !== otp) {
            return res.status(400).json({ success: false, message: "Code de vérification invalide" });
        }

        if (Date.now() > user.verifyOtpExpireAt) {
            return res.status(400).json({ success: false, message: "Le code de vérification a expiré" });
        }


        await db.user.update({
            where: { id: userId },
            data: { isAccountVerified: true, verifyOtp: "", verifyOtpExpireAt: 0 }
        });

        return res.status(200).json({ success: true, message: "Votre compte est maintenant vérifié" });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, message: "Erreur interne du serveur lors de la vérification du compte" });
    }

}

export const isAuthenticated = async (req, res) => {
    try {
        return res.status(200).json({ success: true, message: "Vous êtes authentifié" })
    } catch (error) {
        console.error(error.message);
        return res.status(400).json({ success: false, message: "Vous n'êtes pas authentifié" });
    }
}

export const sendResetOtp = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ success: false, message: "L'email est requis" });
    }
    try {
        const user = await db.user.findUnique({
            where: { email }
        })
        if (!user) {
            return res.status(404).json({ success: false, message: "Utilisateur non trouvé" });
        }

        // générer le otp
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const ExpireAt = Date.now() + 15 * 60 * 1000;

        // mettre à jour le otp et l'expiration dans la base de données
        await db.user.update({
            where: { id: user.id },
            data: { resetOtp: otp, resetOtpExpireAt: ExpireAt }
        });
        // envoyer le otp par email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Réinitialisation de votre mot de passe',
            html: EMAIL_RESET_PASSWORD.replaceAll("{{FRONTEND_URL}}", FRONTEND_URL).replaceAll("{{token_de_reinitialisation}}", user.email + "+" + otp).replace("{{nom_utilisateur}}", user.nom)
        }

        await transporter.sendMail(mailOptions)


        return res.status(200).json({ success: true, message: "Votre code de réinitialisation a été envoyé par email" });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ success: false, message: "Erreur interne du serveur" });
    }
}

export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;
    // console.log(email);
    if (!email || !otp || !newPassword) {
        return res.status(400).json({ success: false, message: "Tous les champs sont requis" });
    }
    try {
        const user = await db.user.findUnique({
            where: { email: email }
        })
        // console.log(user);
        if (!user) {
            return res.status(404).json({ success: false, message: "Utilisateur non trouvé" });
        }
        if (user.resetOtp === "" || user.resetOtp !== otp) {
            return res.status(400).json({ success: false, message: "Code de réinitialisation invalide" });
        }
        if (Date.now() > user.resetOtpExpireAt) {
            return res.status(400).json({ success: false, message: "Le code de réinitialisation a expiré" });
        }
        // hasher le nouveau mot de passe
        const hashedPassword = await bcrypt.hash(newPassword, 12);


        // mettre à jour le mot de passe dans la base de données
        await db.user.update({
            where: { id: user.id },
            data: { password: hashedPassword, resetOtp: "", resetOtpExpireAt: 0 }
        });

        return res.status(200).json({ success: true, message: "Votre mot de passe a été réinitialisé avec succès", user: user });
    } catch {
        return res.status(404).json({ success: false, message: "Utilisateur non trouvé" });
    }
}

export const changerMotDePasse = async (req, res) => {
    const { userId } = req.params;
    const { newPassword } = req.body;

    // console.log("object", userId, newPassword);

    if (!newPassword) {
        return res.status(400).json({ success: false, message: "Tous les champs sont requis" });
    }

    try {
        const user = await db.user.findUnique({
            where: { id: userId }
        });

        if (!user) {
            return res.status(404).json({ success: false, message: "Utilisateur non trouvé" });
        }

        if (!user.isAccountVerified) {
            return res.status(404).json({ success: false, message: 'Veuillez vous connecter' });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 12);

        await db.user.update({
            where: { id: userId },
            data: { password: hashedNewPassword }
        });

        return res.status(200).json({ success: true, message: "Mot de passe modifié avec succès" });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, message: "Erreur interne du serveur lors de la modification du mot de passe" });
    }
}