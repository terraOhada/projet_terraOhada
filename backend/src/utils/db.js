import mongoose from "mongoose";

// Connect to MongoDB
export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL, {
            socketTimeoutMS: 30000, connectTimeoutMS: 30000
        });
        console.log("Connexion à la base de donnée reussie!");
    } catch (error) {
        console.error(`Erreur de connexion à la base de donnée: ${error.message}`);
        process.exit(1);
    }
}