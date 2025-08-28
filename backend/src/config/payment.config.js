// On utilise 'import' pour récupérer le package
import Flutterwave from 'flutterwave-node-v3';

// On initialise le client avec vos clés
const flw = new Flutterwave(
    process.env.FLW_PUBLIC_KEY,
    process.env.FLW_SECRET_KEY,
    // process.env.FLW_ENCRYPTION_KEY
);

// On exporte l'instance 'flw' pour qu'elle soit utilisable ailleurs
export default flw;