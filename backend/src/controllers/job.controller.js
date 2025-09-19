import { jobsData } from "../data/data.js";

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