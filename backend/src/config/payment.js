import paydunya from "paydunya"

const setup = new paydunya.Setup({
    masterKey: process.env.PAYDUNYA_MASTER_KEY,
    privateKey: process.env.PAYDUNYA_PRIVATE_KEY,
    publicKey: process.env.PAYDUNYA_PUBLIC_KEY,
    token: process.env.PAYDUNYA_TOKEN,
    mode: 'test' // Optionnel. Utilisez cette option pour les paiements tests.
});


// Configuration des informations de votre service/entreprise
const store = new paydunya.Store({
    name: 'Terraohada', // Seul le nom est requis
    tagline: "Boostez votre visibilité, crédibilité et réseau avec notre annuaire dédié",
    phoneNumber: '+33695756133',
    postalAddress: 'Sénégal Dakar',
    websiteURL: 'https://mvp-terraohada-frontend.vercel.app',
    logoURL: 'https://res.cloudinary.com/dq0suzd5m/image/upload/v1751902233/logo_TO_lqulsn.png'
});
