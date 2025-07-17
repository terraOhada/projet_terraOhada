import db from "../utils/config.js";

export const ajouterCommentaire = async (req, res) => {
    const { userId, decisionId, nom, contenu, } = req.body;

    // console.log("object:", userId, decisionId, nom, content);

    if (!userId) {
        return res.status(400).json({ success: false, message: "Merci de vous connecter" });
    }

    if (!decisionId) {
        return res.status(400).json({ success: false, message: "Merci de sélectionner une décision" });
    }

    if (!nom || !contenu) {
        return res.status(400).json({ success: false, message: "Merci de remplir tous les champs" });
    }

    try {
        // Vérifier si le commentaire existe déjà
        const commentaireExistant = await db.commentaire.findUnique({
            where: {

                userId_decisionId: {
                    userId,
                    decisionId,
                },
            }
        });

        // console.log("object:", commentaireExistant);
        if (commentaireExistant) {
            return res.status(400).json({ success: false, message: "Vous avez déjà commenté cette décision" });
        }
        // Logique pour ajouter un commentaire
        const commentaire = await db.commentaire.create({
            data: {
                userId,
                decisionId,
                contenu,
                commentBy: nom
            },
        });

        return res.status(201).json({ success: true, message: "Commentaire ajouté avec succès", commentaire });

    } catch (error) {
        console.error("Erreur lors de l'ajout du commentaire:", error);
        return res.status(500).json({ success: false, message: "Erreur interne du serveur" });
    }
}

export const tousLesCommentaires = async (req, res) => {
    try {
        const commentaires = await db.commentaire.findMany({
            include: {
                user: true, // Inclure les détails de l'utilisateur
                decision: true, // Inclure les détails de la décision
            },
        });

        return res.status(200).json({ success: true, data: commentaires });
    } catch (error) {
        console.error("Erreur lors de la récupération des commentaires:", error);
        return res.status(500).json({ success: false, message: "Erreur interne du serveur" });
    }
}

export const commentaireParId = async (req, res) => {
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).json({ success: false, message: "Merci de vous connecter" });
    }

    try {
        const commentaires = await db.commentaire.findMany({
            where: {
                userId,
            },
            include: {
                user: true, // Inclure les détails de l'utilisateur
                decision: true, // Inclure les détails de la décision
            },
        }
        );

        if (commentaires.length === 0) {
            return res.status(404).json({ success: false, message: "Aucun commentaire trouvé pour cet utilisateur" });
        }

        return res.status(200).json({ success: true, data: commentaires });
    } catch (error) {
        console.error("Erreur lors de la récupération des commentaires par ID:", error);
        return res.status(500).json({ success: false, message: "Erreur interne du serveur" });
    }
}

export const commentaireParDecisionId = async (req, res) => {
    const { decisionId } = req.params;
    if (!decisionId) {
        return res.status(400).json({ success: false, message: "Merci de sélectionner une décision" });
    }
    try {
        const commentaires = await db.commentaire.findMany({
            where: {
                decisionId,
            },
            include: {
                user: true, // Inclure les détails de l'utilisateur
            },
        });

        if (commentaires.length === 0) {
            return res.status(404).json({ success: false, message: "Aucun commentaire trouvé pour cette décision" });
        }

        return res.status(200).json({ success: true, data: commentaires });
    } catch (error) {
        console.error("Erreur lors de la récupération des commentaires par décision ID:", error);
        return res.status(500).json({ success: false, message: "Erreur interne du serveur" });
    }
}

export const supprimerCommentaire = async (req, res) => {
    const { userId, decisionId } = req.params;

    if (!userId) {
        return res.status(400).json({ success: false, message: "Merci de vous connecter" });
    }

    if (!decisionId) {
        return res.status(400).json({ success: false, message: "Merci de sélectionner une décision" });
    }

    try {
        // Vérifier si le commentaire existe
        const commentaireExistant = await db.commentaire.findUnique({
            where: {
                userId_decisionId: {
                    userId,
                    decisionId,
                },
            },
        });

        if (!commentaireExistant) {
            return res.status(404).json({ success: false, message: "Commentaire non trouvé" });
        }

        // Logique pour supprimer le commentaire
        await db.commentaire.delete({
            where: {
                userId_decisionId: {
                    userId,
                    decisionId,
                },
            },
        });

        return res.status(200).json({ success: true, message: "Commentaire supprimé avec succès" });

    } catch (error) {
        console.error("Erreur lors de la suppression du commentaire:", error);
        return res.status(500).json({ success: false, message: "Erreur interne du serveur" });
    }
}