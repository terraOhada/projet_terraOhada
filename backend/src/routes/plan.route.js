import { Router } from "express"
import { cancelPlan, createPaymentPlan, fetchAllPlans, fetchPlan, initiateSubscriptionPayment, updatePlan, verifyPayment } from "../controllers/plan.controller.js"

const planRouter = Router()

// ajouter un commentaire
planRouter.post("/creer-plan", createPaymentPlan)

// tous les commentaires
planRouter.get("/tous-les-plans", fetchAllPlans)

// commentaire par userId
planRouter.get("/un-seul-plan/:id", fetchPlan)

// commentaire par decisionId
planRouter.put("/modifier-plan/:id", updatePlan)

planRouter.delete("/supprimer-plan/:id", cancelPlan)

// Route pour initier un paiement
planRouter.post('/payments/subscribe', initiateSubscriptionPayment);

// Route pour vérifier un paiement après redirection
planRouter.get('/payments/verify', verifyPayment);



export default planRouter