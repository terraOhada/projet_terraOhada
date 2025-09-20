import { Router } from "express";
import { isAdmin } from "../middleware/admin.middleware.js";
import { candidatures, changerProfil, mettreAJourProfileCandidat, modifierUtilisateur, profileCandidat, supprimerUtilisateur, tousUtilisateurs, unUtilisateur, utilisateurRole } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get('/tous-utilisateurs/:userId', isAdmin, tousUtilisateurs);
userRouter.get('/un-utilisateur/:userId', unUtilisateur);
// userRouter.post('/ajouter-utilisateur/:userId', ajouterUtilisateur);
userRouter.put('/modifier-utilisateur/:userId', modifierUtilisateur);
userRouter.delete('/supprimer-utilisateur/:userId', supprimerUtilisateur);
userRouter.put('/changer-role/:userId', isAdmin, utilisateurRole);
userRouter.put('/changer-utilisateur', changerProfil);

// jobs
userRouter.get('/:userId/applications', candidatures);
userRouter.get('/:userId/profile', profileCandidat);
userRouter.put('/:userId/profile', mettreAJourProfileCandidat);

export default userRouter;