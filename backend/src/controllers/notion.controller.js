import { getAllJuristes, upsertJuriste } from '../services/juriste.service.js';
import { fetchJuristesFromNotion } from '../services/notion.service.js';


export const syncJuristes = async (req, res) => {
    try {
        const profiles = await fetchJuristesFromNotion();
        const results = await Promise.all(profiles.map(upsertJuriste));

        console.log("profiles", profiles)

        res.status(200).json({
            success: true,
            syncedCount: results.length
        });
    } catch (error) {
        console.error('Sync error:', error);
        res.status(500).json({
            error: 'Échec de la synchronisation',
            details: error.message
        });
    }
};

export const getJuristes = async (req, res) => {
    try {
        // const profiles = await getAllJuristes();
        const profiles = await fetchJuristesFromNotion();
        res.status(200).json({ success: true, message: "Juriste recuperés avec succès", profiles });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Échec de la récupération',
            details: error.message
        });
    }
};