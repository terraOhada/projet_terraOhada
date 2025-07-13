import jwt from "jsonwebtoken";
// Assurez-vous que dotenv.config() est appelé au tout début de votre application (e.g., dans server.js)
// pour que process.env.JWT_SECRET et process.env.NODE_ENV soient disponibles.

export const generateAndSetCookies = (userId, res) => {
    // Vérification essentielle : Assurez-vous que JWT_SECRET est défini
    if (!process.env.JWT_SECRET) {
        console.error("Erreur: La variable d'environnement JWT_SECRET n'est pas définie.");
        // En production, vous pourriez vouloir lancer une erreur ou gérer cela différemment
        throw new Error("Clé secrète JWT manquante pour la génération du token.");
    }

    // 1. Générer le token JWT
    // Utilisez `id` plutôt que `userId` si votre payload de token s'attend à `id` (comme dans authMiddleware)
    const tokenPayload = { id: userId }; // Le payload doit correspondre à ce que vous attendez lors du décodage
    const terra_cookie = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '7d' });

    // 2. Vérifier si l'environnement est en production
    const isProduction = process.env.NODE_ENV === 'production';

    // 3. Configurer les options du cookie
    const cookieOptions = {
        // 'secure' : true en HTTPS (production), false en HTTP (développement)
        secure: isProduction,
        // 'sameSite' : 'Lax' ou 'None'.
        // 'Lax' est la valeur par défaut pour la plupart des navigateurs et offre un bon équilibre.
        // 'None' est nécessaire si votre frontend et backend sont sur des domaines différents,
        // MAIS il nécessite obligatoirement 'secure: true'.
        sameSite: isProduction ? 'Lax' : 'None', // 'None' REQUIERT secure: true
        // 'httpOnly' : true empêche l'accès au cookie via JavaScript côté client, augmentant la sécurité contre le XSS.
        httpOnly: true,
        // 'expires' : Définit la date d'expiration exacte du cookie.
        // L'équivalent de '7d' de expiresIn pour le token JWT.
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        // 'path' : Le chemin pour lequel le cookie est valide. '/' signifie pour tout le domaine.
        path: '/',
    };

    // Gestion du 'domain' pour les environnements cross-domain spécifiques
    // Décommentez et ajustez si votre frontend et votre backend sont sur des sous-domaines différents
    // (ex: api.terraohada.com et app.terraohada.com) OU des domaines complètement différents.
    // Attention: 'domain' doit être un domaine parent partagé.
    // if (isProduction && process.env.COOKIE_DOMAIN) {
    //     cookieOptions.domain = process.env.COOKIE_DOMAIN; // Ex: '.terraohada.com'
    // }

    // 4. Ajouter le cookie à la réponse HTTP
    res.cookie('terra_cookie', terra_cookie, cookieOptions);

    // 5. Retourner le token (facultatif mais utile si le client a aussi besoin du token)
    return terra_cookie;
};