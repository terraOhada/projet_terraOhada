import db from "../utils/config.js";

export const ajouterFavorite = async (req, res) => {
    const { userId } = req.params;
    // Logique pour ajouter un favori
    if (!userId) {
        return res.status(400).json({ success: false, message: "Merci de vous connecter" });
    }

    try {
        // console.log("req.body :", req.body);
        const { decisionId } = req.body;

        if (!decisionId) {
            return res.status(400).json({ success: false, message: "ID de la décision manquant" });
        }

        // Vérifier si le favori existe déjà
        const favoriExistant = await db.favorite.findUnique({
            where: {
                userId_decisionId: {
                    userId,
                    decisionId
                }
            }
        });

        if (favoriExistant) {
            return res.status(400).json({ success: false, message: "Cette décision est déjà dans vos favoris" });
        }

        // Logique pour ajouter le favori
        const favorite = await db.favorite.create({
            data: {
                userId,
                decisionId,
            },
            include: {
                decision: true, // Inclure les détails de la décision
            },
        });

        return res.status(201).json({ success: true, message: "Favori ajouté avec succès 💖", favorite });

    } catch (error) {
        console.error("Erreur lors de l'ajout du favori:", error);
        return res.status(500).json({ message: "Erreur interne du serveur" });

    }
}

export const supprimerFavorite = async (req, res) => {
    const { userId } = req.params;
    // Logique pour supprimer un favori
    if (!userId) {
        return res.status(400).json({ message: "Merci de vous connecter" });
    }

    try {
        const { decisionId } = req.body;

        if (!decisionId) {
            return res.status(400).json({ message: "ID de la décision manquant" });
        }

        // Vérifier d'abord si le favori existe
        const favoriExistant = await db.favorite.findUnique({
            where: {
                userId_decisionId: {
                    userId,
                    decisionId
                }
            }
        });

        if (!favoriExistant) {
            return res.status(404).json({ success: false, message: "Ce favori n'existe pas" });
        }

        // Logique pour supprimer le favori
        const favorite = await db.favorite.delete({
            where: {
                userId_decisionId: {
                    userId,
                    decisionId,
                },
            },
        });

        return res.status(200).json({ success: true, message: "Favori supprimé avec succès", favorite });

    } catch (error) {
        console.error("Erreur lors de la suppression du favori:", error);
        return res.status(500).json({ message: "Erreur interne du serveur" });
    }
}

export const toutesFavorites = async (req, res) => {
    const { userId } = req.params;
    // console.log(userId)
    // Logique pour récupérer tous les favoris d'un utilisateur
    if (!userId) {
        return res.status(400).json({ message: "Merci de vous connecter" });
    }

    try {
        const favorites = await db.favorite.findMany({
            where: { userId },
            include: {
                decision: true, // Inclure les détails de la décision
            },
        });

        // console.log("objects favorites :", favorites);

        return res.status(200).json(favorites);

    } catch (error) {
        console.error("Erreur lors de la récupération des favoris:", error);
        return res.status(500).json({ message: "Erreur interne du serveur" });
    }
}
