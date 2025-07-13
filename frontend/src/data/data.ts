import type { IDecision, IMenuLink } from "../types";

// src/data/data.ts (ou le chemin de votre fichier de données)

export const decisions: IDecision[] = [
  {
    _id: 1,
    titre: "Recours en annulation des actes uniformes : irrecevabilité",
    date: "2024-03-12",
    juridiction: "CCJA",
    resume:
      "La requête en annulation contre l'acte uniforme concerné est rejetée, les conditions de procédure n’ayant pas été respectées.",
    pays: "Côte d'Ivoire",
    annee: 2024,
    sujet: "Actes uniformes",
    tags: ["procédure", "annulation"],
    texte_integral:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    _id: 2,
    titre: "Responsabilité contractuelle et force majeure",
    date: "2022-07-08",
    juridiction: "Cour d'Appel",
    resume:
      "La force majeure invoquée par la partie défenderesse ne remplit pas les conditions légales pour exclure sa responsabilité contractuelle.",
    pays: "Côte d'Ivoire",
    annee: 2022,
    sujet: "Responsabilité",
    tags: ["contrat", "force majeure", "droit civil"],
    texte_integral:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
  },
  {
    _id: 3,
    titre: "Nullité d'une assemblée générale pour irrégularité de convocation",
    date: "2023-11-14",
    juridiction: "Tribunal de Commerce",
    resume:
      "L’assemblée générale a été convoquée en violation des statuts de la société, entraînant sa nullité.",
    pays: "Sénégal",
    annee: 2023,
    sujet: "Droit des sociétés",
    tags: ["société", "nullité", "AG"],
    texte_integral:
      "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
  },
  {
    _id: 4,
    titre: "Recouvrement de créance commerciale : injonction de payer",
    date: "2024-01-20",
    juridiction: "Tribunal de Première Instance",
    resume:
      "Le juge a prononcé une injonction de payer en faveur du créancier, la preuve de la créance étant établie.",
    pays: "Cameroun",
    annee: 2024,
    sujet: "Créances",
    tags: ["recouvrement", "injonction", "commercial"],
    texte_integral:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
  },
  {
    _id: 5,
    titre: "Contentieux fiscal : rectification et droits de douane",
    date: "2023-04-05",
    juridiction: "Cour Suprême",
    resume:
      "La Cour a statué sur la validité d'une rectification fiscale et l'application des droits de douane sur des marchandises importées.",
    pays: "Mali",
    annee: 2023,
    sujet: "Droit Fiscal",
    tags: ["fiscalité", "douanes", "contentieux"],
    texte_integral:
      "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.",
  },
  {
    _id: 6,
    titre: "Exécution forcée d'une décision de justice",
    date: "2022-09-10",
    juridiction: "CCJA",
    resume:
      "La CCJA confirme l'arrêt ordonnant l'exécution forcée d'une décision judiciaire rendue dans un État partie.",
    pays: "Burkina Faso",
    annee: 2022,
    sujet: "Procédure civile",
    tags: ["exécution", "décision de justice", "CCJA"],
    texte_integral:
      "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
  },
  {
    _id: 7,
    titre: "Bail à usage professionnel et résiliation",
    date: "2024-02-28",
    juridiction: "Tribunal de Grande Instance",
    resume:
      "Le tribunal a prononcé la résiliation du bail professionnel en raison du non-paiement répété des loyers par le preneur.",
    pays: "Gabon",
    annee: 2024,
    sujet: "Bail",
    tags: ["bail", "professionnel", "résiliation"],
    texte_integral:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum magnam magni nostrum obcaecati omnis, optio quae repellendus rerum sint vel!",
  },
  {
    _id: 8,
    titre: "Litige foncier : revendication de propriété",
    date: "2023-07-19",
    juridiction: "Cour d'Appel",
    resume:
      "La Cour a rejeté la demande en revendication de propriété, faute de preuves suffisantes pour établir le droit du demandeur.",
    pays: "Niger",
    annee: 2023,
    sujet: "Droit Foncier",
    tags: ["propriété", "foncier", "litige"],
    texte_integral:
      "Quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
  },
  {
    _id: 9,
    titre: "Droit du travail : licenciement abusif",
    date: "2024-05-01",
    juridiction: "Tribunal du Travail",
    resume:
      "Le licenciement du salarié a été jugé abusif en l'absence de motif réel et sérieux, entraînant le paiement de dommages et intérêts.",
    pays: "Bénin",
    annee: 2024,
    sujet: "Droit du Travail",
    tags: ["licenciement", "abusif", "travail"],
    texte_integral:
      "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
  },
  {
    _id: 10,
    titre: "Droit de la concurrence : entente illicite",
    date: "2022-10-25",
    juridiction: "Cour de Justice de l'UEMOA", // Exemple de juridiction hors CCJA mais pertinente
    resume:
      "La Cour a sanctionné une entreprise pour entente illicite ayant eu pour objet de fausser la concurrence sur le marché régional.",
    pays: "Togo",
    annee: 2022,
    sujet: "Droit de la concurrence",
    tags: ["concurrence", "entente", "UEMOA"],
    texte_integral:
      "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
  },
  {
    _id: 11,
    titre:
      "Protection des données personnelles : manquement à l'obligation de sécurité",
    date: "2024-06-18",
    juridiction: "Autorité de protection des données", // Juridiction fictive ou réelle
    resume:
      "Une entreprise a été sanctionnée pour manquement à son obligation d'assurer la sécurité des données personnelles de ses utilisateurs.",
    pays: "Sénégal",
    annee: 2024,
    sujet: "Droit Numérique",
    tags: ["RGPD", "données personnelles", "cybersécurité"],
    texte_integral:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
  },
  {
    _id: 12,
    titre: "Droit minier : annulation de permis d'exploitation",
    date: "2023-01-30",
    juridiction: "Conseil d'État",
    resume:
      "Le permis d'exploitation minière a été annulé suite à des irrégularités dans la procédure d'attribution.",
    pays: "Guinée",
    annee: 2023,
    sujet: "Droit Minier",
    tags: ["mine", "environnement", "permis"],
    texte_integral:
      "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.",
  },
  {
    _id: 13,
    titre: "Droit bancaire : litige sur prêt bancaire",
    date: "2024-04-15",
    juridiction: "Tribunal de Commerce",
    resume:
      "Décision concernant un litige sur les conditions de remboursement d'un prêt bancaire et les intérêts applicables.",
    pays: "Côte d'Ivoire",
    annee: 2024,
    sujet: "Droit Bancaire",
    tags: ["banque", "crédit", "prêt"],
    texte_integral:
      "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
  },
  {
    _id: 14,
    titre: "Arbitrage international : exécution de sentence arbitrale",
    date: "2023-09-01",
    juridiction: "CCJA (Arbitrage)",
    resume:
      "La CCJA a statué sur la demande d'exécution d'une sentence arbitrale internationale rendue sous ses auspices.",
    pays: "Cameroun",
    annee: 2023,
    sujet: "Arbitrage",
    tags: ["arbitrage", "international", "sentence"],
    texte_integral:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum magnam magni nostrum obcaecati omnis, optio quae repellendus rerum sint vel!",
  },
  {
    _id: 15,
    titre: "Droit des transports : avarie de marchandises",
    date: "2022-08-20",
    juridiction: "Tribunal Maritime", // Juridiction fictive ou réelle
    resume:
      "Indemnisation accordée pour avarie de marchandises survenue lors d'un transport maritime international.",
    pays: "Sénégal",
    annee: 2022,
    sujet: "Droit des Transports",
    tags: ["transport", "maritime", "avarie"],
    texte_integral:
      "Quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
  },
];

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
    label: "Jurisprudence",
    to: "/jurisprudence",
    icon: "fa-solid fa-briefcase",
  },
  {
    label: "Aide et Support",
    to: "/aide-et-support",
    icon: "fa-solid fa-question-circle",
  },
  {
    label: "À propos",
    to: "/a-propos",
    icon: "fa-solid fa-question-circle",
  },
];
