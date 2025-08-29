import { Router } from "express"
import { cancelPlan, cancelSubscription, createPaymentPlan, fetchAllPlans, fetchPlan, getSubscriptionStatus, getUserPayments, initiateSubscriptionPayment, updatePlan, verifyPayment } from "../controllers/plan.controller.js"

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

planRouter.get('/user/payments/:userId', getUserPayments);

planRouter.get('/user/subscription-status/:userId', getSubscriptionStatus);

// Route pour qu'un utilisateur résilie son abonnement
planRouter.put('/subscriptions/cancel/:planId', cancelSubscription);

export default planRouter