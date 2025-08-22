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
  typeDecision?: string;
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

export interface ISearchFilters {
  query?: string; // Terme de recherche global (titre, résumé, etc.)
  annee?: number; // Année exacte
  pays?: string; // Pays concerné
  sujetJuridique?: string; // Sujet juridique spécifique
}

export type FilterParams = {
  query?: string;
  year?: string;
  country?: string;
  legalSubject?: string;
  jurisdiction?: string;
  legalText?: string;
  typeDecisions?: string;
};

export interface IProfile {
  id: string | number; // Use string for MongoDB ObjectId compatibility
  notionId: string;
  name: string;
  photo?: string;
  country: string;
  jobTitle: string;
  specialties: string[] | string; // Array of specialties or a single string
  email: string;
  experience: string; // Number of years or a string like "5 ans"
  // isFeatured?: boolean; // Optional, for featured profiles
  isFeatured?: boolean; // Optional, for featured profiles
}

export interface Plan {
  id: string;
  name: string;
  priceMonthly?: number | null;
  priceYearly?: number | null;
  features: string[];
}
