import { applicationsData } from "../data/applicationData.js";
import { jobsData } from "../data/data.js";
import { usersData } from "../data/userData.js";
import { getCompanyJobs } from "../utils/simulation.js";


// --- NOUVELLE ROUTE : Créer une nouvelle offre d'emploi ---
export const createJob = async (req, res) => {
    try {
        const { title, location, contractType, experienceLevel, description } = req.body;

        // Validation simple
        if (!title || !location || !contractType || !experienceLevel || !description) {
            return res.status(400).json({ message: "Veuillez remplir tous les champs obligatoires." });
        }

        // Simuler la création en base de données
        const newId = Math.max(...jobsData.map(j => j.id)) + 1;
        const newJob = {
            id: newId,
            title,
            location,
            contractType,
            experienceLevel,
            description, // Ajout du champ description
            company: "Innovatech Abidjan", // Simuler l'entreprise du recruteur connecté
            logo: "/logos/innovatech.png",
            sector: "Informatique", // Peut aussi venir du formulaire
            remote: "Non", // Peut aussi venir du formulaire
            postedDate: new Date().toISOString(), // Date actuelle
        };

        jobsData.push(newJob);

        console.log("🎉 Nouvelle offre créée :", newJob.title);

        res.status(201).json({ message: "Offre créée avec succès !", job: newJob });

    } catch (error) {
        console.error("Erreur lors de la création de l'offre:", error);
        res.status(500).json({ message: "Erreur interne du serveur." });
    }
}

export const getJobs = async (req, res) => {
    // console.log("Paramètres de requête reçus:", req.query);
    try {
        let filteredJobs = [...jobsData];
        const { q, location, contract, experience, remote, date, sortBy } = req.query;

        // 1. Filtrage par mot-clé (titre)
        if (q) {
            filteredJobs = filteredJobs.filter(job =>
                job.title.toLowerCase().includes(q.toLowerCase())
            );
        }



        // 2. Filtrage par localisation
        if (location) {
            filteredJobs = filteredJobs.filter(job =>
                job.location.toLowerCase().includes(location.toLowerCase())
            );
        }

        // 3. Filtrage par type de contrat
        if (contract) {
            const contractTypes = contract.split(',');
            filteredJobs = filteredJobs.filter(job => contractTypes.includes(job.contractType));
        }

        // --- AJOUT : Filtrage par niveau d'expérience ---
        if (experience) {
            const experienceLevels = experience.split(',');
            filteredJobs = filteredJobs.filter(job => experienceLevels.includes(job.experienceLevel));
        }

        // --- AJOUT : Filtrage par télétravail ---
        if (remote) {
            const remoteOptions = remote.split(',');
            filteredJobs = filteredJobs.filter(job => remoteOptions.includes(job.remote));
        }

        // 4. Filtrage par date de publication
        if (date) {
            const now = new Date();
            let timeLimit;
            if (date === '24h') {
                timeLimit = new Date(now.getTime() - (24 * 60 * 60 * 1000));
            } else if (date === '7d') {
                timeLimit = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000));
            }
            if (timeLimit) {
                filteredJobs = filteredJobs.filter(job => new Date(job.postedDate) >= timeLimit);
            }
        }

        // 5. Tri des résultats
        if (sortBy === 'date') {
            filteredJobs.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
        }

        // console.log("Offres filtrées:", filteredJobs.length);

        // --- 3. Nouvelle structure de réponse ---
        // On renvoie un objet contenant les offres ET les métadonnées de pagination
        res.status(200).json(filteredJobs);

    } catch (error) {
        console.error("Erreur lors du filtrage des offres d'emploi:", error);
        res.status(500).json({ message: "Une erreur interne est survenue sur le serveur." });
    }
};

export const getJobById = async (req, res) => {
    try {
        const jobId = parseInt(req.params.id, 10);

        // 1. Trouver l'offre principale
        const job = jobsData.find(j => j.id === jobId);

        if (!job) {
            return res.status(404).json({ message: "Offre d'emploi non trouvée" });
        }

        // 2. Trouver des offres similaires (même secteur, ID différent)
        const similarJobs = jobsData.filter(j =>
            j.sector === job.sector && j.id !== jobId
        ).slice(0, 3); // On en prend 3 au maximum

        // 3. Renvoyer une réponse structurée
        res.status(200).json({
            job,
            similarJobs,
        });

    } catch (error) {
        console.error("Erreur lors de la récupération de l'offre:", error);
        res.status(500).json({ message: "Erreur interne du serveur." });
    }
}

export const applyJob = async (req, res) => {
    const jobId = parseInt(req.params.id, 10);
    const { userId, coverLetter, resumeUrl } = req.body; // Données envoyées par le frontend

    // --- Point de débogage pour voir la candidature arriver ---
    console.log(`\n🎉 Nouvelle candidature reçue pour l'offre ID: ${jobId}`);
    console.log(`   - Utilisateur (simulé) ID: ${userId}`);
    console.log(`   - CV utilisé: ${resumeUrl}`);
    console.log(`   - Lettre de motivation: "${coverLetter || 'Aucune'}"`);
    console.log('----------------------------------------------------');

    // On vérifie si l'offre existe dans nos données fictives
    const jobExists = jobsData.some(j => j.id === jobId);
    if (!jobExists) {
        return res.status(404).json({ message: "Cette offre n'existe pas." });
    }

    // Dans une vraie application, ici vous sauvegarderiez la candidature en base de données.
    // Pour ce test, on renvoie simplement un succès après 1 seconde pour simuler le temps de traitement.
    setTimeout(() => {
        res.status(200).json({ message: "Votre candidature a été soumise avec succès !" });
    }, 1000);
}

// --- NOUVELLE ROUTE : Stats pour le tableau de bord du recruteur ---
export const statsRecruiter = async (req, res) => {
    // Simuler le recruteur connecté et son entreprise
    const recruiterCompany = "Innovatech Abidjan";
    const companyJobs = getCompanyJobs(recruiterCompany);
    const companyJobIds = companyJobs.map(job => job.id);

    const totalApplicationsCount = applicationsData.filter(app => companyJobIds.includes(app.jobId)).length;

    res.json({
        activeJobsCount: companyJobs.length,
        totalApplicationsCount: totalApplicationsCount,
    });
}


// --- NOUVELLE ROUTE : Liste des offres postées par le recruteur ---
export const offresRecruteur = async (req, res) => {
    const recruiterCompany = "Innovatech Abidjan";
    const companyJobs = getCompanyJobs(recruiterCompany);

    // Enrichir chaque offre avec le nombre de candidatures
    const jobsWithCounts = companyJobs.map(job => {
        const applicationCount = applicationsData.filter(app => app.jobId === job.id).length;
        return { ...job, applicationCount };
    });

    res.json(jobsWithCounts);
}

// --- NOUVELLE ROUTE : Liste des candidats pour UNE offre spécifique ---
export const candidatsOffre = async (req, res) => {
    const jobId = parseInt(req.params.jobId, 10);

    // console.log("id : ", req.params)


    // 1. Trouver les candidatures pour cette offre
    const applicants = applicationsData.filter(app => app.jobId === jobId);

    // 2. Enrichir avec les détails du candidat
    const enrichedApplicants = applicants.map(app => {
        const applicantDetails = usersData.find(user => user.userId === app.userId);
        return {
            ...app,
            applicantName: applicantDetails ? `${applicantDetails.prenom} ${applicantDetails.nom}` : "Candidat Anonyme",
            applicantHeadline: applicantDetails ? applicantDetails.headline : "N/A",
        };
    });

    res.json(enrichedApplicants);
}

// --- NOUVELLE ROUTE : Mettre à jour le statut d'une candidature ---
export const mettreAJourStatutCandidature = async (req, res) => {
    const appId = parseInt(req.params.appId, 10);
    const { status } = req.body;

    console.log(`\n🔄 Mise à jour du statut de la candidature ID: ${appId} -> ${status}`);

    // Simuler la mise à jour dans la base de données
    const applicationIndex = applicationsData.findIndex(app => app.id === appId);
    if (applicationIndex !== -1) {
        applicationsData[applicationIndex].status = status;
        console.log(`Statut de la candidature ${appId} mis à jour à : ${status}`);
        res.status(200).json(applicationsData[applicationIndex]);
    } else {
        res.status(404).json({ message: "Candidature non trouvée" });
    }
}