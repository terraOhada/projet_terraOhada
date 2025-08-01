import db from "../utils/config.js"

export const upsertJuriste = async (profileData) => {
    return db.juristes.upsert({
        where: { notionId: profileData.notionId },
        update: profileData,
        create: profileData,
    });
};

export const getAllJuristes = async () => {
    return db.juristes.findMany();
};