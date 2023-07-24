import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/userSchema.js";

export const RegisterUserSubmit = async (req, res) => {
    try {
        let user_ = await User.findOne({ email: req.body.email });
        const verifyPassword =
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$/;

        if (user_) {
            return res.json({
                message:
                    "Vous avez déjà un compte enregistré avec cette adresse mail",
            });
        }

        if (!verifyPassword.test(req.body.password)) {
            return res.json({
                message:
                    "Le mot de passe ne respecte pas les conditions: 8 caractères incluant majuscule, minuscule et caractères spéciaux",
            });
        }

        let user = {
            informations: {
                name: req.body.name,
                firstname: req.body.firstname,
            },
            contact: {
                email: req.body.email,
            },
            password: req.body.password,
            userType: req.body.userType,
        };
        let newUser = new User(user);

        await newUser.save();
        res.json({
            message: "L'utilisateur est bien enregistré",
        });
    } catch (err) {
        res.json({
            message: "L'utilisateur n'a pas pu être enregistré",
            err: err,
        });
    }
};

export const LoginUserSubmit = async (req, res) => {
    let user = await User.findOne({ "contact.email": req.body.email });
    if (user) {
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (result) {
                const token = jwt.sign({ id: user.id }, "mon_secret", {
                    expiresIn: "24h",
                });

                res.json({
                    id: user._id,
                    informations: {
                        name: user.informations.name,
                        firstname: user.informations.firstname,
                    },
                    contact: {
                        email: user.contact.email,
                    },
                    userType: user.userType,
                    isAdmin: user.isAdmin,
                    token: token,
                });
            } else {
                res.json({
                    message:
                        "Mot de passe incorrecte, veuillez revoir votre saisie",
                });
            }
        });
    } else {
        res.json({ message: "L'email renseignée est introuvable" });
    }
};

export const GetUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (!users) {
            return res.json({ message: "Aucun utilisateur à afficher" });
        } else {
            res.json(users);
        }
    } catch (err) {
        res.json({
            message: "Impossible d'afficher les utilisateurs",
            err: err,
        });
    }
};

export const GetUser = async (req, res) => {
    const id = req.params.id;

    try {
        let user = await User.findById(id);
        if (!user) {
            return res.json({ message: "Cet utilisateur n'existe pas" });
        } else {
            res.json(user);
        }
    } catch (err) {
        res.json({ message: "Impossible d'afficher l'utilisateur", err: err });
    }
};

export const EditUserSubmit = async (req, res) => {
    const id = req.params.id;

    try {
        let user = {
            informations: {
                name: req.body.name,
                firstname: req.body.firstname,
            },
            contact: {
                email: req.body.email,
            },
        };

        await User.updateOne({ _id: id }, user);
        res.json({ message: "L'utilisateur est bien modifié" });
    } catch (err) {
        res.json({
            message: "L'utilisateur n'a pas pu être modifié",
            err: err,
        });
    }
};

export const AdminEditUserSubmit = async (req, res) => {
    const id = req.params.id;

    try {
        let user = {
            informations: {
                name: req.body.name,
                firstname: req.body.firstname,
            },
            contact: {
                email: req.body.email,
            },
            isAdmin: req.body.isAdmin,
        };

        await User.updateOne({ _id: id }, user);
        res.json({ message: "L'utilisateur est bien modifié" });
    } catch (err) {
        res.json({
            message: "L'utilisateur n'a pas pu être modifié",
            err: err,
        });
    }
};

export const DeleteUser = async (req, res) => {
    const id = req.params.id;

    try {
        let user = await User.findById(id);
        if (!user) {
            return res.json({ message: "Cet utilisateur n'existe pas" });
        } else {
            await User.deleteOne({ _id: id });
            res.json({ message: "L'utilisateur est bien supprimé" });
        }
    } catch (err) {
        res.json({
            message: "L'utilisateur n'a pas pu être supprimé",
            err: err,
        });
    }
};