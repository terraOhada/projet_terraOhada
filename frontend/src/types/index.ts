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

export interface IFavorite {
  id: string;
  decision: IDecision;
  userId: string;
  decisionId: string;
}

export interface IUser {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  role: "USER" | "ADMIN" | "SUPER_ADMIN"; // Simplified roles for this example
  photo?: string; // Optional, for user profile picture
}

export interface IMenuLink {
  label: string;
  to: string;
  icon?: string; // Optional, for FontAwesome icons
}

export interface ICountryOption {
  name: string;
  code: string;
}

export interface ICountrySelectProps {
  value?: string;
  onChange: (value: string) => void;
  className?: string;
  required?: boolean;
  placeholder?: string;
}

export interface IYearSelectProps {
  value?: string;
  onChange: (value: string) => void;
  className?: string;
  required?: boolean;
  placeholder?: string;
  startYear?: number;
  endYear?: number;
  reverse?: boolean;
}

export interface ILegalSubject {
  id: string;
  name: string;
  category: string;
}

export interface ILegalSubjectSelectProps {
  value?: string;
  onChange: (value: string) => void;
  className?: string;
  required?: boolean;
  placeholder?: string;
  showCategory?: boolean;
}

export interface ISearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}
