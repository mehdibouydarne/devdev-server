import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

export const connectdb = mongoose.connect(process.env.DB_URL);

mongoose.connection.on("error", () => {
    console.log("Erreur dans la connexion");
});

mongoose.connection.on("open", () => {
    console.log("Connexion à la base de données avec succès");
});