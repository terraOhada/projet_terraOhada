export const applicationsData = [
    {
        id: 1,
        userId: "user_123", // L'ID de notre utilisateur simulé
        jobId: 1, // Correspond à "Développeur Frontend React"
        status: "Vue par le recruteur",
        appliedAt: "2025-09-20T10:00:00Z",
    },
    {
        id: 2,
        userId: "user_123",
        jobId: 18, // Correspond à "Responsable E-commerce"
        status: "Envoyée",
        appliedAt: "2025-09-18T14:30:00Z",
    },
    {
        id: 3,
        userId: "user_123",
        jobId: 4, // Correspond à "Comptable Senior"
        status: "Refusée",
        appliedAt: "2025-09-15T11:00:00Z",
    },
    {
        id: 4,
        userId: "user_456", // Une candidature d'un autre utilisateur
        jobId: 2,
        status: "Envoyée",
        appliedAt: "2025-09-19T16:00:00Z",
    },
];

// Données fictives pour le profil de l'utilisateur
export const userProfileData = {
    userId: "user_123",
    completion: 75, // Pourcentage de complétion du profil
};