export interface IDecision {
  id: number | string; // Use string for MongoDB ObjectId compatibility
  idInterne: string;
  titreDecision: string;
  dateDecision: string; // string when received from API, convert to Date for display
  juridiction: string;
  pays: string;
  matiere: string;
  resume: string;
  sujet: string;
  lienSource?: string;
  statut: string;
  annee?: number; // Optional, can be derived from date
  article?: string;
  articleMisAjour?: string; // Optional, for full text display
}

// id              String  @id @default(auto()) @map("_id") @db.ObjectId
//   idInterne       String  @unique // "ID interne" - Identifiant unique de la décision
//   titreDecision   String // "Titre de la décision"
//   juridiction     String // "Juridiction"
//   dateDecision    String // "Date" - Stocké comme DateTime
//   pays            String // "Pays"
//   matiere         String // "Matière"
//   resume          String? // "Résumé" - Optionnel, car le champ peut être vide
//   lienSource      String? // "Lien source" - Optionnel
//   statut          String // "Statut (validé/incomplet)" - Optionnel, pourrait être un Enum si les valeurs sont fixes
//   article         String? // "Articles" - Optionnel
//   articleMisAjour String? // "Articles mis à jour" - Utilisation de @map pour un nom de colonne différent
//   colonne1        String?

//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt

export interface IMenuLink {
  label: string;
  to: string;
  icon?: string; // Optional, for FontAwesome icons
}
