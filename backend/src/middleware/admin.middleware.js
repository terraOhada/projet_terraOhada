import db from "../utils/config.js"

export const isAdmin = async (req, res, next) => {
    const { userId } = req.params

    if (!userId) {
        return res.status(401).json({ success: false, message: "Vous n'êtes pas autorisé" })
    }

    try {
        const user = await db.user.findFirst({
            where: {
                id: userId
            }
        })

        if (!userId) {
            return res.status(404).json({ success: false, message: "Utilisateur non trouvé" })
        } else {
            req.role = user.role
        }
        next()

    } catch (error) {
        console.error("Erreur inattendue dans isAdmin:", error);
        return res.status(500).json({ success: false, message: 'Erreur interne du serveur lors du role.' });
    }

}