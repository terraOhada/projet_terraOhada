# DOCUMENTATION TECHNIQUE DE TERRAOHADA

![terraohada logo](https://res.cloudinary.com/dq0suzd5m/image/upload/v1751902233/logo_TO_lqulsn.png)

## 📋 Sommaire

- [📖 1. Vue d'Ensemble](##-1-vue-densemble)
- [🏗 2. Stack Technique & Architecture](##-2-stack-technique--architecture)
- [🚀 3. Démarrage Rapide (Développement Local)](##-3-démarrage-rapide-développement-local)
- [📁 4. Structure du Projet](##-4-structure-du-projet)
- [🤝 6. Guide de Contribution](##-6-guide-de-contribution)
- [🚀 7. Déploiement](##-7-déploiement)
- [👥 8. Guide Utilisateur](##-8-déploiement)
- [🚀 9. Procédures de Déploiement Détaillées](##-9-procédures-de-déploiement-détaillées)

## 📖 1. Vue d'Ensemble

**TerraOhada** répond à un besoin clair : rendre le droit OHADA accessible, compréhensible et exploitable. Dans un environnement où l’accès à l’information juridique reste souvent complexe, dispersé ou inégal, la plateforme centralise les contenus clés : textes, décisions, résumés, commentaires dans une interface claire et fonctionnelle.
Accessible depuis tous les pays membres de l’OHADA, et bien au-delà, **TerraOhada** s’adresse à tous ceux qui travaillent avec le droit des affaires africain, ou s’y intéressent

### **Pour qui est Terraohada :**

**1. Professionnels du droit OHADA**  
La plateforme s’adresse à tous les praticiens du droit en Afrique francophone : avocats, juristes d’entreprise, notaires, magistrats, greffiers, experts-comptables ou fiscalistes. Elle leur permet d’accéder rapidement à des contenus fiables liés au droit OHADA, pour renforcer leur veille juridique et faciliter leur travail quotidien.

**2. Étudiants en droit et en spécialisation OHADA**  
Pensée comme un outil d’accompagnement, la solution offre aux étudiants un accès simplifié aux textes juridiques, jurisprudences et ressources essentielles à la compréhension du droit des affaires africain. Elle soutient leur apprentissage et leurs recherches dès les premières années d’étude.

**3. Enseignants-chercheurs et experts en droit des affaires africain**  
Les universitaires, doctorants et passionnés du droit OHADA peuvent s’appuyer sur la plateforme pour enrichir leurs travaux de recherche, préparer leurs cours ou partager des références. L’outil facilite l’accès aux sources, dans une logique de vulgarisation et de diffusion du savoir.

**4. Entreprises, institutions et ONG opérant dans l’espace OHADA**  
Dans un environnement où la sécurité juridique est cruciale, notre solution permet aux organisations implantées dans les 17 États membres de mieux comprendre le cadre légal unifié de l’OHADA. Elle constitue un point d’entrée fiable pour appuyer les équipes internes ou les partenaires juridiques.

**5. Cabinets de recrutement et structures RH juridiques (bientôt disponible)**  
À mesure que la plateforme évolue, elle intégrera des fonctionnalités à forte valeur ajoutée pour les cabinets spécialisés dans le recrutement juridique en Afrique. Bien que la mise en relation directe ne soit pas encore disponible, la plateforme pose les bases d’un écosystème juridique connecté, à suivre de près.

### Pourquoi choisir TerraOhada ?

TerraOhada, c'est bien plus qu'une base de données juridiques. C'est un véritable écosystème conçu pour faciliter l'accès au droit OHADA.

1.  Interface claire et moderne
2.  Gain de temps significatif
3.  Information fiable et continue
4.  Conçue en Afrique, pour l'Afrique
5.  Démarche collaborative

### Fonctionnalités Clés de TerraOhada

#### 1- Annuaire OHADA des professionnels(en cours de développement)

Boostez votre **visibilité**, **crédibilité** et **réseau** avec notre annuaire dédié.

**Pour les professionnels** : valorisez votre expertise, développez votre clientèle et connectez vous à un écosystème qualifié.

**Pour les particuliers et entreprises** : trouvez rapidement un professionnel selon sa spécialité, son pays ou sa juridiction, et entrez facilement en contact.

#### 2- Base juridique Ohada

Tapez un mot-clé, un pays, une juridiction ou un thème.

#### 3- Espace personnel sécurisé

Historique de recherches et contenus favoris.

#### 4- Job board juridique (bientôt disponible)

Accédez à des offres d’emploi, de stage ou de collaboration dans le domaine juridique en Afrique. Mettez en relation recruteurs et candidats qualifiés.

#### 5- Quizz juridiques interactifs

Testez vos connaissances sur le droit OHADA grâce à des quiz ludiques et pédagogiques conçus pour les étudiants et jeunes professionnels.

---

**État du projet** : 📍MVP 1 (TEST)

**Lien vers l'application** : https://mvp-terraohada-frontend.vercel.app

**Dépôt GitHub** : https://github.com/terraOhada/projet_terraOhada (Privé)

---

## 🏗 2. Stack Technique & Architecture

### **Stack Utilisé**

- **Frontend :** React 18+, TypeScript, Zustand, Tanstack Query Tailwind CSS, Vite

- **Backend :** Node.js, Express.js,
- **Base de Données :** MongoDB (avec Prisma ORM) , Notion (Pour les Juristes) & Excel (Pour les quizz)
- **Authentification :** JWT (JSON Web Tokens)
- **Hébergement :** Frontend sur Vercel, Backend & DB sur Render
- **Autres Services :** Cloudinary (stockage d'images), Flutterwave(Paiement, Abonnement)

### **Architecture**

Le projet suit une architecture client-serveur (API REST).

```mermaid
graph LR
    A[Navigateur Client] --> B[Frontend React<br/>TypeScript, Vite<br/>Hébergé sur Vercel];
    B --> C[Backend API Express.js<br/>Node.js<br/>Hébergé sur Render];
    C --> E[(MongoDB<br/>avec Prisma)];
    C --> F[Cloudinary];
    C --> G[Flutterwave];
    C --> H[(Notion API)];
    C --> I[(Fichiers Excel)];
```

## 3. 🚀 Démarrage Rapide (Développement Local)

#### **Prérequis**

Assurez-vous d'avoir installé sur votre machine :

- Node.js (v18 ou supérieure)
- npm ou yarn

#### **Instructions d'Installation**

1.  **Cloner le dépôt et installer les dépendances**

```markdown
git clone https://github.com/terraOhada/projet_terraOhada.git
cd projet_terraOhada

# Installer les dépendances du backend

cd backend && npm install

# Installer les dépendances du frontend

cd ../frontend && npm install
```

2. **Configuration de l'Environnement**

- Backend : Copiez `backend/.env.example` vers `backend/.env` et renseignez les variables.
- Frontend : Copiez `frontend/.env.example` vers `frontend/.env.local` et renseignez les variables.  
  _Variables clés à définir :_

```
# backend/.env

# Basic
DATABASE_URL=""
JWT_SECRET=
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
FRONTEND_URL=https://mvp-terraohada-frontend.vercel.app

# Brevo SMTP
SMTP_USER=
SMTP_PASSWORD=
SENDER_EMAIL="example@gmail.com"

# Cloudinary keys
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Notion keys
NOTION_API_KEY=
NOTION_DATABASE_ID=

# Flutterwave test keys
FLW_PUBLIC_KEY=
FLW_SECRET_KEY=
FLW_ENCRYPTION_KEY=
FLW_REDIRECT_URL=http://localhost:5173/payment-callback

---
# frontend/.env.local
VITE_NODE_ENV=development
VITE_API_BASE_URL=http://localhost:5000/api
```

3. **Initialiser la Base de Données**

```
cd backend
npx prisma generate
npx prisma db push
npm run seed # (Optionnel) Peuple la DB avec des données de test
```

4.  **Lancer les Services**

    - **Lancer le backend :** `cd backend && npm run dev`
    - **Lancer le frontend :** `cd frontend && npm run dev`
    - L'application sera accessible sur `http://localhost:5173` et l'API sur `http://localhost:5000`.

## 4. **📁 Structure du Projet**

Le projet est organisé en deux dossiers principaux : `backend` et `frontend`, suivant une architecture monorepo.

#### **Backend (Node.js + Express)**

```
backend/
├── prisma/                 # Schémas et migrations de la base de données
├── src/
│   ├── config/            # Fichiers de configuration (DB, cloud, etc.)
│   ├── controllers/       # Contrôleurs - Logique métier des routes
│   ├── generated/         # Fichiers générés (probablement par Prisma)
│   ├── middleware/        # Middlewares Express (auth, validation, etc.)
│   ├── nodemailer/        # Configuration et templates d'emails
│   ├── routes/            # Définitions des routes de l'API
│   ├── scripts/           # Scripts utilitaires (migrations, seeds, etc.)
│   ├── services/          # Services métier et logique complexe
│   ├── utils/             # Fonctions utilitaires (helpers)
│   └── index.js           # Point d'entrée de l'application
├── temp/                  # Dossier de fichiers temporaires
├── uploads/               # Dossier de stockage des uploads
├── .env                   # Variables d'environnement (NE PAS VERSIONNER)
├── .gitignore            # Fichiers ignorés par Git
├── package.json          # Dépendances et scripts du backend
└── vercel.json           # Configuration du déploiement sur Vercel
```

#### **Frontend (React + TypeScript + Vite)**

```
frontend/
├── public/                # Fichiers statiques (icônes, images publics)
├── src/
│   ├── api/              # Configurations et fonctions pour appels API
│   ├── assets/           # Assets (images, fonts) importés dans le code
│   ├── components/       # Composants React réutilisables
│   ├── data/             # Données statiques (ex: options de filtres)
│   ├── hooks/            # Hooks React personnalisés
│   ├── layout/           # Composants de layout (Header, Footer, Sidebar)
│   ├── pages/            # Composants de pages / vues
│   ├── query/            # Configuration TanStack Query
│   ├── store/            # Configuration Zustand (état global)
│   ├── types/            # Définitions TypeScript
│   ├── utils/            # Fonctions utilitaires
│   ├── App.tsx           # Composant racine de l'application
│   ├── index.css         # Styles globaux
│   └── main.tsx          # Point d'entrée de l'app React
├── env/                  # Variables d'environnement (?)
├── index.html            # Template HTML principal
├── package.json          # Dépendances et scripts du frontend
└── eslint.config.js      # Configuration ESLint pour le linting
```

## 6. 🤝 Guide de Contribution

1.  **Créer une branche** à partir de `develop` : `git checkout -b feat/nouvelle-fonctionnalite`
2.  **Respectez les conventions de code** : Le projet utilise ESLint et Prettier. Exécutez `npm run lint` avant de committer.
3.  **Testez vos modifications**.
4.  **Poussez votre branche** et ouvrez une **Pull Request** vers `develop`.
5.  Assurez-vous que tous les checks CI (tests, lint) passent.

## 7. 🚀 Déploiement

Le déploiement est entièrement automatisé via GitHub Actions :

- **Branche `main`** : Un push déclenche un déploiement automatique en **production** (sur Vercel & Render).
- **Branche `develop`** : Un push déclenche un déploiement automatique en **environnement de staging** (URL de preview).

Les variables d'environnement sont gérées directement sur les plateformes d'hébergement (Vercel & Render).

### 👥 8. Guide Utilisateur

Cette section décrit les fonctionnalités principales du point de vue de l'utilisateur final et comment les utiliser.

#### **8.1. Création de Compte et Connexion**

- **Inscription** : Rendez-vous sur la page d'accueil et cliquez sur "Connexion". Remplissez le formulaire avec votre email, un mot de passe et les informations requises (nom, prénom,). Un email de confirmation vous sera envoyé.
- **Connexion** : Utilisez votre email et mot de passe pour vous connecter à votre espace personnel sécurisé.
- **Mot de passe oublié** : Utilisez le lien "Mot de passe oublié" pour réinitialiser votre accès via email.

#### **8.2. Utilisation de la Base Juridique OHADA**

- **Recherche simple** : Dans la barre de recherche principale, tapez un mot-clé (ex: "société", "contrat", "sûreté").
- **Année** : Sélectionner une année
- **Pays** : Côte d'Ivoire, Sénégal, Cameroun...
- **Filtres avancés** : Utilisez les filtres pour affiner votre recherche par :

  Année

  - **Sujet juridique** : Droit commercial ,Droits de sureté...
  - **Types de décisions** : Ordonnance, Arrêt, Avis...
  - **Juridiction** : CCJA, Juridictions nationales...
  - **Texte juridique** : Actes uniformes, Code OHADA...

- **Consultation d'une décision** : Cliquez sur [lire une décision]() pour voir le détail de la décision, y compris le texte intégral, les commentaires de la communauté et les références.

#### **8.3. Gestion de l'Espace Personnel**

- **Favoris** : Cliquez sur l'icône [♡]() ou "Ajouter aux favoris" pour la sauvegarder dans votre espace personnel pour un accès ultérieur.
- **Historique** : Consultez l'historique de toutes vos recherches et consultations.
- **Profil** : Modifiez vos informations personnelles et vos préférences depuis l'onglet "Mon Profile" en cliquant sur votre photo de profil.

#### **8.4. Résolution des Quiz Juridiques**

- Accédez à la section "Quizz TerraOhada" depuis le menu principal.
- Répondez aux questions à choix multiples. Votre score s'affichera à la fin avec les corrections.
- Relevez le défi pour améliorer votre score et vos connaissances.

#### **8.5. Gestion de l'Abonnement et Paiement (Le cas échéant)**

- Accédez à la page "Abonnement" pour voir les formules disponibles (Gratuit, Premium, etc.).
- Le paiement des formules payantes est sécurisé et s'effectue via Flutterwave (carte bancaire, mobile money, etc.).
- Gérez et consultez vos factures dans votre espace personnel.

### 🚀 9. Procédures de Déploiement Détaillées

Cette section décrit les étapes précises pour déployer manuellement l'application en environnement de production ou de staging.

#### **9.1. Déploiement du Backend (API) sur Render**

1.  **Préparation du Build :**

    - Assurez-vous que la branche `main` (ou `develop` pour le staging) est à jour et stable.
    - Vérifiez que toutes les variables d'environnement dans le fichier `backend/.env` sont correctement configurées pour la production (`NODE_ENV=production`, URLs de base de données et services externes de production).

2.  **Déploiement sur Render :**

    - Render se connecte automatiquement à votre dépôt GitHub et déploie à chaque push sur la branche liée.
    - **Variables d'environnement sur Render :** Renseignez toutes les variables du fichier `.env` directement dans l'interface web de Render (Dashboard > votre service > Environment).
    - **Build Command :** `npm install` (Render détecte automatiquement le `package.json`).
    - **Start Command :** `npm start` (Assurez-vous que le script `"start": "node dist/index.js"` existe dans `package.json`).

3.  **Vérification Post-Déploiement :**

    - Accédez aux logs de l'application sur le dashboard Render pour vérifier qu'aucune erreur ne s'est produite au démarrage.
    - Testez l'endpoint health-check ou un endpoint API public (ex: `GET /api/health`) pour confirmer que l'API répond.

#### **9.2. Déploiement du Frontend (React) sur Vercel**

1.  **Préparation du Build :**

    - Assurez-vous que la branche `main` est à jour.
    - Vérifiez que la variable `VITE_API_BASE_URL` dans `frontend/.env.production` pointe vers l'URL de votre backend déployé sur Render (et non `localhost`).

2.  **Déploiement sur Vercel :**

    - Connectez votre dépôt GitHub à Vercel.
    - Configurez le projet :

      - **Framework Preset :** Vite
      - **Root Directory :** `frontend`
      - **Build Command :** `npm run build` (ou `yarn build`)
      - **Output Directory :** `dist`

    - **Variables d'environnement :** Ajoutez toutes les variables préfixées par `VITE_` depuis votre `.env.production` dans les settings du projet sur Vercel.

3.  **Vérification Post-Déploiement :**

    - Vercel fournit une URL de preview pour chaque déploiement. Visitez-la pour tester le bon fonctionnement de l'interface.
    - Testez les fonctionnalités clés : chargement des pages, appel API (login, recherche), etc.

#### **9.3. Déploiement de la Base de Données (Migrations)**

- **Environnement de Production :** Les migrations de base de données doivent être effectuées avec prudence.
- **Processus :**

  1.  **Localement :** Exécutez `npx prisma migrate dev --name nom_de_la_migration` pour créer une nouvelle migration.
  2.  **Pousser la migration :** Poussez le dossier `prisma/migrations` généré sur la branche `main`.
  3.  **Appliquer en production :** Render exécute automatiquement les commandes de build définies. Ajoutez la commande `npx prisma generate` dans le **Build Command** de Render (`npm run build` pourrait déjà le contenir) pour appliquer automatiquement les migrations à chaque déploiement.

- **Alternative (Recommandée pour la production) :** Exécutez manuellement et en toute sécurité la commande de migration via un script ou une connexion SSH après le déploiement du backend : `npx prisma migrate deploy`.

#### **9.4. Rollback (Procédure de Retour Arrière)**

En cas de problème critique après un déploiement :

1.  **Frontend (Vercel) :** Dans le dashboard Vercel, allez dans la section "Deployments", trouvez le dernier déploiement stable et cliquez sur "⋮" > "Redeploy".
2.  **Backend (Render) :** Dans le dashboard Render, allez dans la section "Deploys" et utilisez la fonction "Rollback" pour revenir à la version précédente.
3.  **Base de données :** Les migrations Prisma sont conçues pour être irréversibles. Un rollback de code backend est souvent préférable. Pour des changements de schéma critiques, une restauration de sauvegarde (backup) de la base de données peut être nécessaire.
