import db from "../utils/config.js"

export const ajouterDecision = async (req, res) => {
    const role = req.role // 
    const { decision } = req.body

    if (role !== "SUPER_ADMIN") {
        return res.status(400).json({ success: false, message: 'Désolé, vous n\'êtes pas autorisé' })
    }

    try {
        await db.decision.create({
            data: {
                idInterne: decision.idInterne,
                // "ID interne" - Identifiant unique de la décision
                titreDecision: decision.titreDecision,   // "Titre de la décision"
                juridiction: decision.juridiction,     // "Juridiction"
                dateDecision: decision.dateDecision,   // "Date" - Stocké comme DateTime
                pays: decision.pays,           // "Pays"
                matiere: decision.matiere,        // "Matière"
                resume: decision.resume,        // "Résumé" - Optionnel, car le champ peut être vide
                lienSource: decision.lienSource,    // "Lien source" - Optionnel
                statut: decision.statut,       // "Statut (validé/incomplet)" - Optionnel, pourrait être un Enum si les valeurs sont fixes
                article: decision.article,        // "Articles" - Optionnel
                articleMisAjour: decision.articleMisAjour,  // "Articles mis à jour" - Utilisation de @map pour un nom de colonne différent
                typeDecision: decision.typeDecision

            }
        })
        return res.status(201).json({ success: true, message: "Décision enregistrée avec succès !" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Erreur lors de l'ajout de la décision" })
    }
}

export const supprimerDecision = async (req, res) => {
    const role = req.role // 
    const { decisionId } = req.body

    if (role !== "SUPER_ADMIN") {
        return res.status(400).json({ success: false, message: 'Désolé, vous n\'êtes pas autorisé' })
    }

    try {
        await db.decision.delete({
            where: {
                id: decisionId
            }
        })
        return res.status(200).json({ success: true, message: 'Décision supprimée avec succès' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'Erreur lors de la suppression de la décision' })
    }
}

export const mettreAJourDecision = async (req, res) => {
    const role = req.role // 
    const { decisionId, updatedData } = req.body

    // console.log("donnes", updatedData, decisionId)

    if (role !== "SUPER_ADMIN") {
        return res.status(400).json({ success: false, message: 'Désolé, vous n\'êtes pas autorisé' })
    }

    if (!decisionId || !updatedData) {
        return res.status(400).json({ success: false, message: 'ID de décision ou données mises à jour manquantes' })
    }

    const { id, ...rest } = updatedData;

    console.log("rest", rest.typeDecsion)

    try {
        const updatedDecision = await db.decision.update({
            where: { id: decisionId },
            data: rest
        })
        return res.status(200).json({ success: true, data: updatedDecision })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'Erreur lors de la mise à jour de la décision' })
    }
}

export const toutesDecisions = async (req, res) => {
    // const role = req.role // 

    // if (role !== "SUPER_ADMIN") {
    //     return res.status(400).json({ success: false, message: 'Désolé, vous n\'êtes pas autorisé' })
    // }

    try {
        const decisions = await db.decision.findMany()
        return res.status(200).json({ success: true, data: decisions })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'Erreur lors de la récupération des décisions' })
    }
}

export const uneDecision = async (req, res) => {
    const role = req.role // 
    const { decisionId } = req.body

    if (role !== "SUPER_ADMIN") {
        return res.status(400).json({ success: false, message: 'Désolé, vous n\'êtes pas autorisé' })
    }

    try {
        const decision = await db.decision.findUnique({
            where: { id: decisionId }
        })
        if (!decision) {
            return res.status(404).json({ success: false, message: 'Décision non trouvée' })
        }
        return res.status(200).json({ success: true, data: decision })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'Erreur lors de la récupération de la décision' })
    }
}