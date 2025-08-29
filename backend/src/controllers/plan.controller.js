import axios from "axios";
import flw from "../config/payment.config.js";
import { v4 as uuidv4 } from 'uuid'; // Pour générer des références uniques
import db from "../utils/config.js";

/**
 * @description Créer un nouveau plan de paiement
 * @route POST /api/plans
 */
export const createPaymentPlan = async (req, res) => {

    // console.log(req.body)
    try {
        // On récupère les données depuis le corps de la requête (ex: un formulaire)
        const { amount, name, interval, currency } = req.body;

        // console.log("interval : ", interval)

        // Validation simple pour s'assurer que les champs requis sont présents
        if (!amount || !name || !interval || !currency) {
            return res.status(400).json({
                status: 'error',
                message: 'Les champs amount, name, interval et currency sont requis.'
            });
        }

        const payload = { amount, name, interval, currency };
        const response = await flw.PaymentPlan.create(payload);

        res.status(201).json({ status: 'success', data: response.data });

    } catch (error) {
        console.error("Erreur lors de la création du plan:", error);
        res.status(500).json({ status: 'error', message: "Impossible de créer le plan." });
    }
};

/**
 * @description Récupérer tous les plans de paiement
 * @route GET /api/plans
 */
export const fetchAllPlans = async (req, res) => {
    try {
        const response = await flw.PaymentPlan.get_all();
        res.status(200).json({ status: 'success', data: response.data });
    } catch (error) {
        console.error("Erreur lors de la récupération des plans:", error);
        res.status(500).json({ status: 'error', message: "Impossible de récupérer les plans." });
    }
};

/**
 * @description Récupérer un plan de paiement spécifique par son ID
 * @route GET /api/plans/:id
 */
export const fetchPlan = async (req, res) => {
    try {
        // L'ID est récupéré depuis les paramètres de l'URL (ex: /api/plans/52045)
        const { id } = req.params;
        const payload = { id };

        const response = await flw.PaymentPlan.get_plan(payload);
        res.status(200).json({ status: 'success', data: response.data });
    } catch (error) {
        console.error("Erreur lors de la récupération du plan:", error);
        res.status(500).json({ status: 'error', message: "Impossible de récupérer le plan." });
    }
};

/**
 * @description Mettre à jour un plan de paiement
 * @route PUT /api/plans/:id
 */
export const updatePlan = async (req, res) => {
    try {
        const { id } = req.params;
        // On récupère uniquement les champs que l'on souhaite mettre à jour
        const { name, status } = req.body;

        const payload = { id, name, status };
        const response = await flw.PaymentPlan.update(payload);

        res.status(200).json({ status: 'success', data: response.data });
    } catch (error) {
        console.error("Erreur lors de la mise à jour du plan:", error);
        res.status(500).json({ status: 'error', message: "Impossible de mettre à jour le plan." });
    }
};

/**
 * @description Annuler un plan de paiement
 * @route DELETE /api/plans/:id
 */
export const cancelPlan = async (req, res) => {
    try {
        const { id } = req.params;
        const payload = { id };

        const response = await flw.PaymentPlan.cancel(payload);
        // console.log("response", response)
        res.status(200).json({ status: 'success', data: response.data });
    } catch (error) {
        console.error("Erreur lors de l'annulation du plan:", error);
        res.status(500).json({ status: 'error', message: "Impossible d'annuler le plan." });
    }
};

/**
 * @description Initier un paiement pour un plan de souscription
 * @route POST /api/payments/subscribe
 */
export const initiateSubscriptionPayment = async (req, res) => {
    try {
        const { plan_id, email, name } = req.body;

        if (!plan_id || !email || !name) {
            return res.status(400).json({ message: "L'ID du plan et les informations client sont requis." });
        }

        // On récupère les détails du plan pour avoir le montant et la devise corrects
        const planDetails = await flw.PaymentPlan.get_plan({ id: plan_id });
        if (!planDetails || planDetails.status !== 'success') {
            return res.status(404).json({ message: "Plan non trouvé ou invalide." });
        }

        const payload = {
            // tx_ref doit être unique pour chaque transaction
            tx_ref: `sub-${uuidv4()}`,
            amount: planDetails.data.amount,
            currency: planDetails.data.currency,
            // URL où l'utilisateur sera redirigé après le paiement
            redirect_url: process.env.FLW_REDIRECT_URL,
            payment_plan: plan_id, // L'ID du plan à lier à ce paiement
            customer: {
                email: email,
                name: name,
            },
            customizations: {
                title: `Abonnement à ${planDetails.data.name}`,
                logo: 'https://res.cloudinary.com/dq0suzd5m/image/upload/v1753882962/ohada-uploads/vybrtui71nmrpiotdhdn.png',
            },
        };
        // --- DÉBUT DE LA MODIFICATION ---

        const flutterwaveApiUrl = 'https://api.flutterwave.com/v3/payments';

        const response = await axios.post(
            flutterwaveApiUrl,
            payload, // Le corps de la requête
            {
                headers: {
                    // L'autorisation se fait avec la clé secrète
                    Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`
                }
            }
        );

        // --- FIN DE LA MODIFICATION ---

        // On renvoie le lien de paiement au frontend
        res.status(200).json({ status: 'success', link: response.data.data.link });

    } catch (error) {
        console.error("Erreur lors de l'initialisation du paiement:", error);
        res.status(500).json({ status: 'error', message: "Impossible d'initier le paiement." });
    }
};


/**
 * @description Vérifier le statut d'une transaction et l'enregistrer en BDD
 * @route GET /api/payments/verify
 */
export const verifyPayment = async (req, res) => {
    try {
        const { transaction_id } = req.query;

        if (!transaction_id) {
            return res.status(400).json({ message: "L'ID de la transaction est requis." });
        }

        // 1. Vérification auprès de Flutterwave
        const response = await flw.Transaction.verify({ id: transaction_id });

        // Si la vérification échoue ou le paiement n'est pas réussi
        if (response.data.status !== 'successful') {
            return res.status(400).json({ status: 'failed', message: "Le paiement a échoué ou est en attente." });
        }

        // 2. Logique d'enregistrement avec db
        const paymentData = response.data;

        // console.log("paymentdata :", paymentData)

        // Vérifier si ce paiement a déjà été enregistré pour éviter les doublons
        const existingPayment = await db.payment.findUnique({
            where: { transactionId: paymentData.id }
        });

        if (existingPayment) {
            console.log("Ce paiement a déjà été traité.");
            return res.status(200).json({ status: 'success', message: "Paiement déjà vérifié.", data: existingPayment });
        }

        const chaineComplete = paymentData.customer.email;

        const morceaux = chaineComplete.split('_');
        const email = morceaux[morceaux.length - 1];

        // On suppose que vous avez un moyen de retrouver l'utilisateur (ex: via l'email)
        // Pour cet exemple, on en crée un s'il n'existe pas.
        const user = await db.user.findFirst({
            where: { email: email },
        });

        // Enregistrer le nouveau paiement dans la base de données
        const newPayment = await db.payment.create({
            data: {
                transactionId: paymentData.id,
                txRef: paymentData.tx_ref,
                status: paymentData.status,
                amount: paymentData.amount,
                currency: paymentData.currency,
                // Lier le paiement à l'utilisateur
                user: {
                    connect: { id: user.id },
                },
                // Si vous avez l'ID du plan, vous pouvez aussi le lier ici
                // plan: { connect: { planId: paymentData.plan } }
            },
        });

        // 3. Mettre à jour votre logique métier
        // C'est ici que vous activez l'abonnement, envoyez un email de confirmation, etc.
        console.log('Paiement enregistré avec succès !', newPayment);

        res.status(200).json({ status: 'success', data: newPayment });

    } catch (error) {
        console.error("Erreur lors de la vérification du paiement:", error);
        // Gérer les erreurs db (ex: contrainte unique violée)
        if (error.code === 'P2002') {
            return res.status(409).json({ status: 'error', message: "Un paiement avec cet ID existe déjà." });
        }
        res.status(500).json({ status: 'error', message: "Impossible de vérifier le paiement." });
    }
};



/**
 * @description Récupérer l'historique des paiements pour un utilisateur
 * @route GET /api/user/payments
 */
export const getUserPayments = async (req, res) => {
    try {
        // On suppose que vous avez l'ID de l'utilisateur connecté
        // (par exemple, via un middleware d'authentification qui ajoute `req.user`)
        const { userId } = req.params;

        const payments = await db.payment.findMany({
            where: {
                userId: userId,
            },
            // Optionnel : trier du plus récent au plus ancien
            orderBy: {
                createdAt: 'desc',
            },
            //   // Optionnel : inclure les détails du plan associé
            //   include: {
            //     plan: true,
            //   }
        });

        res.status(200).json({ status: 'success', data: payments });

    } catch (error) {
        console.error("Erreur lors de la récupération des paiements de l'utilisateur:", error);
        res.status(500).json({ status: 'error', message: "Impossible de récupérer l'historique." });
    }
};



/**
 * @description Vérifier si un utilisateur a un abonnement actif
 * @route GET /api/user/subscription-status
 */
export const getSubscriptionStatus = async (req, res) => {
    try {
        const { userId } = req.params;

        // On cherche le dernier paiement réussi de l'utilisateur
        const lastSuccessfulPayment = await db.payment.findFirst({
            where: {
                userId: userId,
                status: 'successful',
            },
            orderBy: {
                createdAt: 'desc',
            },
            // include: {
            //     plan: true,
            // },
        });

        if (!lastSuccessfulPayment) {
            return res.status(200).json({ status: 'success', data: { isActive: false, plan: null } });
        }

        // Ici, vous pouvez ajouter une logique pour vérifier si l'abonnement a expiré
        // Exemple simple : si le dernier paiement date de plus de 31 jours pour un plan mensuel
        const now = new Date();
        const paymentDate = new Date(lastSuccessfulPayment.createdAt);
        const planInterval = lastSuccessfulPayment.amount === 900 ? "monthly" : "yearly";

        let isActive = false;
        if (planInterval === 'monthly') {
            const expirationDate = new Date(paymentDate.setDate(paymentDate.getDate() + 31));
            isActive = now < expirationDate;
        } else if (planInterval === 'yearly') {
            const expirationDate = new Date(paymentDate.setFullYear(paymentDate.getFullYear() + 1));
            isActive = now < expirationDate;
        }

        const plan = {
            name: planInterval === "monthly" ? "Premium Mensuel" : "Premium Annuel",
            interval: planInterval
        }

        res.status(200).json({ status: 'success', data: { isActive, plan: plan } });

    } catch (error) {
        console.error("Erreur lors de la vérification du statut:", error);
        res.status(500).json({ status: 'error', message: "Impossible de vérifier le statut." });
    }
};

/**
 * @description Résilier un abonnement (annule le plan de paiement)
 * @route PUT /api/subscriptions/cancel/:planId
 */
export const cancelSubscription = async (req, res) => {
    try {
        const { planId } = req.params;
        // On suppose que l'ID de l'utilisateur est disponible via un middleware d'authentification
        const { userId } = req.query

        if (!userId && !planId) return res.status(400).json({ status: 'failed', message: "merci de vous connnecter" })

        // console.log(userId)

        // 1. Appel à Flutterwave pour annuler le plan de paiement
        // Cela empêchera les futures facturations automatiques.
        await flw.PaymentPlan.cancel({ id: planId });

        // 2. Mettre à jour le statut dans votre base de données
        // On cherche le dernier paiement réussi pour ce plan et cet utilisateur pour le marquer comme résilié.
        // Note : Vous pourriez avoir un modèle 'Subscription' dédié pour simplifier cela.
        const lastPayment = await db.payment.findFirst({
            where: {
                user: { id: userId },
                // plan: { planId: parseInt(planId) },
                status: 'successful'
            },
            orderBy: { createdAt: 'desc' }
        });

        if (lastPayment) {
            await db.payment.update({
                where: { id: lastPayment.id },
                data: { status: 'cancelled' } // Ou un champ dédié `subscriptionStatus`
            });
        }

        res.status(200).json({ status: 'success', message: 'Abonnement résilié avec succès.' });

    } catch (error) {
        console.error("Erreur lors de la résiliation de l'abonnement:", error.response ? error.response.data : error.message);
        res.status(500).json({ status: 'error', message: "Impossible de résilier l'abonnement." });
    }
};