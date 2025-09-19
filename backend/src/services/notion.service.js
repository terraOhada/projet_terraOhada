import { Client } from '@notionhq/client';
import { getProperty } from '../utils/notion.helpers.js';

// console.log("secret_notion", process.env.NOTION_API_KEY)
// console.log("secret_notion", process.env.NOTION_DATABASE_ID)

const notionClient = new Client({ auth: process.env.NOTION_API_KEY });

export const fetchJuristesFromNotion = async () => {
    try {

        const response = await notionClient.databases.query({
            database_id: process.env.NOTION_DATABASE_ID,
        });

        return response.results.map(page => ({
            notionId: page.id,
            name: getProperty(page, 'Votre nom et Prénom', 'title'),
            photo: getProperty(page, 'Votre photo', 'files'),
            country: getProperty(page, "Pays d'exercice", 'rich_text'),
            jobTitle: getProperty(page, 'Fonction/Titre professionnel (1)', 'rich_text'),
            specialties: getProperty(page, 'Spécialité(s)(3 maximum)', 'rich_text'),
            email: getProperty(page, 'E-mail', 'email'),
            experience: getProperty(page, "Nombre d'années d'expérience", 'select'),
            phone: getProperty(page, 'Numéro mobile (WhatsApp)', 'phone_number'),
            structure: getProperty(page, 'Nom de la structure', 'rich_text'),
            bio: getProperty(page, 'Éléments biographiques', 'rich_text'),
            wantsContact: getProperty(page, 'Souhaitez-vous etre contacté pour des tests plateformes ?', 'multi_select'),
            structureSize: getProperty(page, 'Taille de la structure', 'multi_select'),
            exerciseStructure: getProperty(page, "Structure d'exercice", 'rich_text')
        }));
    } catch (error) {
        console.error('[DEBUG] Full Notion error:', error);
        throw error;
    }
};

// fetchJuristesFromNotion()