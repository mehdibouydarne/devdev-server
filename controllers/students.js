import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import Student from "../models/studentSchema.js";

// Permet de créer un étudiant
export const RegisterStudentSubmit = async (req, res) => {
    try {
        // Vérifie si l'utilisateur n'a pas déjà de compte
        let user = await Student.findOne({ email: req.body.email });

        // Conditionne le mot de passe
        const verifyPassword =
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$/;

        if (user) {
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

        // Récupère les données des champs transmis par le front
        let student = {
            informations: {
                salutation: req.body.salutation,
                name: req.body.name,
                firstname: req.body.firstname,
            },
            contacts: {
                email: req.body.email,
                phone: req.body.phone,
            },
            address: {
                zip: req.body.zip,
            },
            password: req.body.password,
            newsletter: req.body.newsletter,
            userType: req.body.userType,
        };

        // Ajoute l'utilisateur avec les données récupérées du front
        let newStudent = new Student(student);

        await newStudent.save();

        // Renvoie un message pour dire que l'enregistrement s'est bien effectué
        res.json({ message: "L'étudiant(e) est bien enregistré(e)." });
    } catch (err) {

        // Renvoie un message pour dire que l'enregistrement ne s'est pas bien effectué
        res.json({
            message: "L'étudiant(e) n'a pas pu être enregistré(e).",
            err: err,
        });
    }
};

// Permet à l'étudiant se connecter
export const LoginStudentSubmit = async (req, res) => {

    // Vérifie que l'utilisateur existe bien
    let user = await Student.findOne({ "contacts.email": req.body.email });
    if (user) {

        // Compare le mot de passe indiqué et celui présent dans la baase de données
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (result) {

                // Crée le token de l'utilisateur
                const token = jwt.sign({ id: user.id }, "mon_secret", {
                    expiresIn: "24h",
                });

                // Renvoie les informations de l'utilisateurs
                res.json({
                    id: user._id,
                    informations: {
                        salutation: user.informations.salutation,
                        name: user.informations.name,
                        firstname: user.informations.firstname,
                    },
                    contacts: {
                        email: user.contacts.email,
                        phone: user.contacts.phone,
                    },
                    address: {
                        zip: user.address.zip,
                    },
                    userType: user.userType,
                    isAdmin: user.isAdmin,
                    token: token,
                });
            } else {

                // Renvoie un message pour dire que le mot de passe indiqué est erroné
                res.json({
                    message:
                        "Mot de passe incorrecte, veuillez revoir votre saisie",
                });
            }
        });
    } else {

        // Renvoie un message pour dire que le mot de passe indiqué est erroné
        res.json({ message: "L'email renseignée est introuvable" });
    }
};

// Permet de récupérer tous les étudiants
export const GetStudents = async (req, res) => {
    try {
        const students = await Student.find();
        if (!students) {
            return res.json({ message: "Aucun étudiant à afficher" });
        } else {
            res.json(students);
        }
    } catch (err) {
        res.json({ message: "Impossible d'afficher les étudiants", err: err });
    }
};

// Permet de récupérer un étudiant
export const GetStudent = async (req, res) => {
    const id = req.params.id;

    try {
        const student = await Student.findById(id);
        if (!student) {
            return res.json({ message: "Cet étudiant n'existe pas" });
        } else {
            res.json(student);
        }
    } catch (err) {
        res.json({ message: "Impossible d'afficher l'étudiant", err: err });
    }
};

// Permet à un étudiant de modifier son profil
export const EditStudentSubmit = async (req, res) => {
    const id = req.params.id;

    try {
        let student = {
            informations: {
                salutation: req.body.salutation,
                name: req.body.name,
                firstname: req.body.firstname,
            },
            contacts: {
                email: req.body.email,
                phone: req.body.phone,
            },
            address: {
                zip: req.body.zip,
            },
            newsletter: req.body.newsletter,
        };

        await Student.updateOne({ _id: id }, student);
        res.json({ message: "L'étudiant est bien modifié" });
    } catch (err) {
        res.json({
            message: "L'étudiant n'a pas pu être modifié",
            err: err,
        });
    }
};

// Permet à un admin de modifier un étudiant
export const AdminEditStudentSubmit = async (req, res) => {
    const id = req.params.id;

    try {
        let student = {
            informations: {
                salutation: req.body.salutation,
                name: req.body.name,
                firstname: req.body.firstname,
            },
            contacts: {
                email: req.body.email,
                phone: req.body.phone,
            },
            address: {
                zip: req.body.zip,
            },
            newsletter: req.body.newsletter,
            isAdmin: req.body.isAdmin,
        };

        await Student.updateOne({ _id: id }, student);
        res.json({ message: "L'étudiant est bien modifié" });
    } catch (err) {
        res.json({
            message: "L'étudiant n'a pas pu être modifié",
            err: err,
        });
    }
};

// Permet de supprimer un étudiant
export const DeleteStudent = async (req, res) => {
    const id = req.params.id;

    try {
        const student = await Student.findById(id);
        if (!student) {
            return res.json({ message: "Cet étudiant n'existe pas" });
        } else {
            await Student.deleteOne({ _id: id });
        }
    } catch (err) {
        res.json({ message: "L'étudiant n'a pas pu être supprimé", err: err });
    }
};