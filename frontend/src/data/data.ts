import type { ICountryOption, ILegalSubject, IMenuLink } from "../types";

// src/data/data.ts (ou le chemin de votre fichier de données)

export const menuLinks: IMenuLink[] = [
  {
    label: "Accueil",
    to: "/",
    icon: "fa-solid fa-gavel",
  },
  {
    label: "Le produit",
    to: "/presentation-terraohada",
    icon: "fa-solid fa-scroll",
  },
  {
    label: "Annuaire",
    to: "/annuaire",
    icon: "fa-solid fa-briefcase",
  },
  {
    label: "Aide et Support",
    to: "/aide-et-support",
    icon: "fa-solid fa-question-circle",
  },
  // {
  //   label: "À propos",
  //   to: "/a-propos",
  //   icon: "fa-solid fa-question-circle",
  // },
];

export const COUNTRIES: ICountryOption[] = [
  { name: "Bénin", code: "BN" },
  { name: "Burkina Faso", code: "BF" },
  { name: "Cameroun", code: "CM" },
  { name: "Comores", code: "CO" },
  { name: "Congo (Brazzaville)", code: "CB" },
  { name: "Congo, République Démocratique", code: "CD" },
  { name: "Côte d'Ivoire", code: "CI" },
  { name: "Gabon", code: "GA" },
  { name: "Guinée", code: "RG" },
  { name: "Guinée-Bissau", code: "GB" },
  { name: "Guinée équatoriale", code: "GQ" },
  { name: "Mali", code: "ML" },
  { name: "Niger", code: "NE" },
];

export const LEGAL_SUBJECTS: ILegalSubject[] = [
  { id: "1", name: "Droit des sociétés et GIE", category: "Droit commercial" },
  { id: "2", name: "Droit des sûretés", category: "Droit commercial" },
  {
    id: "3",
    name: "Droit des procédures collectives",
    category: "Droit commercial",
  },
  { id: "4", name: "Droit comptable OHADA", category: "Droit financier" },
  { id: "5", name: "Arbitrage OHADA", category: "Règlement des différends" },
  { id: "6", name: "Contrats commerciaux", category: "Droit des obligations" },
  {
    id: "7",
    name: "Transport de marchandises",
    category: "Droit des affaires",
  },
  {
    id: "8",
    name: "Droit des sociétés coopératives",
    category: "Droit commercial",
  },
  { id: "9", name: "Droit bancaire", category: "Droit financier" },
  { id: "10", name: "Propriété intellectuelle", category: "Droit spécial" },
  {
    id: "11",
    name: "Droit des sociétés civiles",
    category: "Droit des sociétés",
  },
  { id: "12", name: "Droit fiscal OHADA", category: "Droit fiscal" },
  {
    id: "13",
    name: "Droit des contrats publics",
    category: "Droit administratif",
  },
  { id: "14", name: "Droit des consommateurs", category: "Droit spécial" },
  { id: "15", name: "Droit du travail OHADA", category: "Droit social" },
];
