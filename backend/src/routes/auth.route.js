import express from 'express';
import { isAuthenticated, login, logout, register, resetPassword, sendResetOtp, sendVerifyOtp, verifyAccount } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';


const authRouter = express.Router();

// inscription
authRouter.post('/register', register)

// connexion
authRouter.post('/login', login)

// déconnexion
authRouter.post('/logout', logout)

// envoyer le otp
authRouter.post('/send-verify-otp/:userId', sendVerifyOtp)

// verfification du compte
authRouter.post('/verify-account', verifyAccount)

// vérifier si l'utiisateur est authentifié
authRouter.get('/verify-authentificated', authMiddleware, isAuthenticated)

authRouter.post('/send-reset-otp', sendResetOtp)

// réinitialiser le mot de passe
authRouter.post('/reset-password', resetPassword)

export default authRouter;