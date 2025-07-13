import { Router } from "express";
import { isAdmin } from "../middleware/admin.middleware.js";
import { ajouterDecision, mettreAJourDecision, supprimerDecision, toutesDecisions, uneDecision } from "../controllers/decision.controller.js";

const decisionRouter = Router()

// ajouter une décision
decisionRouter.post('/ajouter-decision/:userId', isAdmin, ajouterDecision)
decisionRouter.delete('/supprimer-decision/:userId', isAdmin, supprimerDecision)
decisionRouter.put('/modifier-decision/:userId', isAdmin, mettreAJourDecision)
decisionRouter.get('/toutes-decisions/:userId', isAdmin, toutesDecisions)
decisionRouter.get('/une-decision/:userId', isAdmin, uneDecision)

export default decisionRouter