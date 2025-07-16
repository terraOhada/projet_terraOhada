import { Router } from "express";
import { isAdmin } from "../middleware/admin.middleware.js";
import { changerProfil, modifierUtilisateur, supprimerUtilisateur, tousUtilisateurs, unUtilisateur, utilisateurRole } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get('/tous-utilisateurs/:userId', isAdmin, tousUtilisateurs);
userRouter.get('/un-utilisateur/:userId', unUtilisateur);
// userRouter.post('/ajouter-utilisateur/:userId', ajouterUtilisateur);
userRouter.put('/modifier-utilisateur/:userId', modifierUtilisateur);
userRouter.delete('/supprimer-utilisateur/:userId', supprimerUtilisateur);
userRouter.put('/changer-role/:userId', isAdmin, utilisateurRole);
userRouter.put('/changer-utilisateur', changerProfil);

export default userRouter;