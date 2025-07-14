import db from "../utils/config.js"

export const utilisateurRole = async (req, res) => {
    const role = req.role // 
    const { userId, newRole } = req.body

    if (role !== "SUPER_ADMIN") {
        return res.status(400).json({ success: false, message: 'Désolé, vous n\'êtes pas autorisé' })
    }

    try {
        const updatedUser = await db.user.update({
            where: { id: userId },
            data: { role: newRole }
        })
        return res.status(200).json({ success: true, message: "role modifié avec succès", data: updatedUser })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'Erreur lors de la mise à jour du rôle de l\'utilisateur' })
    }
}

export const tousUtilisateurs = async (req, res) => {
    const role = req.role // 

    // console.log(role)

    if (role == 'USER') {
        return res.status(400).json({ success: false, message: 'Désolé, vous n\'êtes pas autorisé' })
    }

    try {
        const users = await db.user.findMany()
        return res.status(200).json({ success: true, data: users })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'Erreur lors de la récupération des utilisateurs' })
    }
}

export const unUtilisateur = async (req, res) => {
    const role = req.role // 
    const { userId } = req.params

    if (role !== "SUPER_ADMIN" || role !== "ADMIN") {
        return res.status(400).json({ success: false, message: 'Désolé, vous n\'êtes pas autorisé' })
    }

    try {
        const user = await db.user.findUnique({
            where: { id: userId }
        })
        return res.status(200).json({ success: true, data: user })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'Erreur lors de la récupération de l\'utilisateur' })
    }
}

export const supprimerUtilisateur = async (req, res) => {
    const role = req.role // 
    const { userId } = req.params

    if (role !== "SUPER_ADMIN") {
        return res.status(400).json({ success: false, message: 'Désolé, vous n\'êtes pas autorisé' })
    }

    try {
        await db.user.delete({
            where: { id: userId }
        })
        return res.status(200).json({ success: true, message: 'Utilisateur supprimé avec succès' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'Erreur lors de la suppression de l\'utilisateur' })
    }
}

export const modifierUtilisateur = async (req, res) => {
    const role = req.role // 
    const { userId, updatedData } = req.body

    if (role !== "SUPER_ADMIN" && role !== "ADMIN") {
        return res.status(400).json({ success: false, message: 'Désolé, vous n\'êtes pas autorisé' })
    }

    try {
        const updatedUser = await db.user.update({
            where: { id: userId },
            data: updatedData
        })
        return res.status(200).json({ success: true, data: updatedUser })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'Erreur lors de la mise à jour de l\'utilisateur' })
    }
}