import 'dotenv/config';
import axios from 'axios';

const runSync = async () => {
    try {
        const response = await axios.post(
            `http://localhost:${process.env.PORT || 5000}/api/sync`
        );
        console.log('Sync réussie :', response.data);
    } catch (error) {
        console.error('Échec du sync :', error.response?.data || error.message);
    }
};

// Exécution toutes les 30 minutes
setInterval(runSync, 30 * 60 * 1000);

// Première exécution immédiate
runSync();