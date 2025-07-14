import { Router } from "express";
import { ajouterFavorite, supprimerFavorite, toutesFavorites } from "../controllers/favorite.controller.js";

const favoriteRouter = Router();

favoriteRouter.post('/ajouter-favorite/:userId', ajouterFavorite);
favoriteRouter.delete('/supprimer-favorite/:userId', supprimerFavorite);
favoriteRouter.get('/toutes-favorites/:userId', toutesFavorites);

export default favoriteRouter;