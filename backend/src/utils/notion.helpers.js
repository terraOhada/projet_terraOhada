export const getProperty = (page, propertyName, propertyType) => {
    if (!page.properties[propertyName]) {
        console.warn(`Propriété "${propertyName}" manquante. Options disponibles:`,
            Object.keys(page.properties));
        return null;
    }

    const prop = page.properties[propertyName];

    try {
        switch (propertyType) {
            case 'title':
                return prop.title[0]?.plain_text || null;
            case 'rich_text':
                return prop.rich_text[0]?.plain_text || null;
            case 'files':
                return prop.files[0]?.file?.url || null;
            case 'select':
                return prop.select?.name || null;
            case 'multi_select':
                return prop.multi_select?.map(item => item.name) || [];
            case 'email':
                return prop.email || null;
            case 'phone_number':
                return prop.phone_number || null;
            case 'number':
                return prop.number ?? 0; // Nullish coalescing pour garder 0
            case 'text':
                return prop.text?.content || null
            default:
                console.warn(`Type non géré: ${propertyType} pour ${propertyName}`);
                return null;
        }
    } catch (e) {
        console.error(`Erreur sur ${propertyName}:`, e);
        return null;
    }
}