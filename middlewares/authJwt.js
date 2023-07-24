import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";

// Vérifie le token d'authentification
export const verifyToken = (req, res, next) => {
    let authToken = req.headers.authorization;
    let token = authToken && authToken.split(" ")[1];

    if (!token) {
        return res.json({ message: "Vous n'êtes pas authentifié" });
    }

    jwt.verify(token, "mon_secret", (err, result) => {
        if (err) {
            return res.json({
                message: "Vous n'êtes pas autorisé à accéder à cette page",
            });
        }

        req.userId = result.id;
        next();
        return;
    });
};

// Vérifie si l'utilisateur est administrateur
export const isAdmin = async (req, res, next) => {
    const user = await User.findById(req.userId);

    if (!user) {
        return res.json({ message: "Vous n'êtes pas authentifié" });
    }

    if (!user.isAdmin) {
        return res.json({
            message: "Vous devez être administrateur pour accéder à cette page",
        });
    }

    next();
    return;
};
