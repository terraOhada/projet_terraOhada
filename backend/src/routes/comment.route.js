import { Router } from "express"
import { ajouterCommentaire, commentaireParDecisionId, commentaireParId, tousLesCommentaires } from "../controllers/comment.controller.js"

const commentRouter = Router()

// ajouter un commentaire
commentRouter.post("/ajouter-commentaire", ajouterCommentaire)

// tous les commentaires
commentRouter.get("/tous-les-commentaires", tousLesCommentaires)

// commentaire par userId
commentRouter.get("/commentaire-par-utilisateur/:userId", commentaireParId)

// commentaire par decisionId
commentRouter.get("/commentaire-par-decision/:decisionId", commentaireParDecisionId)



export default commentRouter