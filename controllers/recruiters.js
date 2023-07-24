import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import Recruiter from "../models/recruiterSchema.js";

export const RegisterRecruiterSubmit = async (req, res) => {
    try {
        let user = await Recruiter.findOne({ email: req.body.email });
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

        let recruiter;
        if (req.file) {
            recruiter = {
                logo: {
                    src: req.file.filename,
                    alt: req.file.originalname,
                },
                informations: {
                    name: req.body.name,
                    description: req.body.description,
                },
                contacts: {
                    email: req.body.email,
                    phone: req.body.phone,
                },
                address: {
                    street: req.body.street,
                    city: req.body.city,
                    zip: req.body.zip,
                },
                password: req.body.password,
                userType: req.body.userType,
            };
        } else {
            recruiter = {
                logo: {
                    src: "img-default.png",
                    alt: "default image",
                },
                informations: {
                    name: req.body.name,
                    description: req.body.description,
                },
                contacts: {
                    email: req.body.email,
                    phone: req.body.phone,
                },
                address: {
                    street: req.body.street,
                    city: req.body.city,
                    zip: req.body.zip,
                },
                password: req.body.password,
                userType: req.body.userType,
            };
        }
        let newRecruiter = new Recruiter(recruiter);

        await newRecruiter.save();
        res.json({
            message: "Le recruteur/la recruteuse est bien enregistré(e)",
        });
    } catch (err) {
        res.json({
            message: "Le recruteur/la recruteuse n'a pas pu être enregistré(e)",
            err: err,
        });
    }
};

export const LoginRecruiterSubmit = async (req, res) => {
    let user = await Recruiter.findOne({ "contacts.email": req.body.email });

    if (user) {
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (result) {
                const token = jwt.sign({ id: user.id }, "mon_secret", {
                    expiresIn: "24h",
                });

                res.json({
                    id: user._id,
                    logo: {
                        src: user.logo.src,
                        alt: user.logo.alt,
                    },
                    informations: {
                        name: user.informations.name,
                        description: user.informations.description,
                    },
                    contacts: {
                        email: user.contacts.email,
                        phone: user.contacts.phone,
                    },
                    address: {
                        street: user.address.street,
                        city: user.address.city,
                        zip: user.address.zip,
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

export const GetRecruiters = async (req, res) => {
    try {
        let recruiters = await Recruiter.find();
        if (!recruiters) {
            return res.json({ message: "Aucun recruteur à afficher" });
        } else {
            res.json(recruiters);
        }
    } catch (err) {
        res.json({ message: "Impossible d'afficher les recruteurs", err: err });
    }
};

export const GetRecruiter = async (req, res) => {
    const id = req.params.id;

    try {
        let recruiter = await Recruiter.findById(id);
        if (!recruiter) {
            return res.json({ message: "Ce recruteur n'existe pas" });
        } else {
            res.json(recruiter);
        }
    } catch (err) {
        res.json({ message: "Impossible d'afficher le recruteur", err: err });
    }
};

export const EditRecruiterSubmit = async (req, res) => {
    const id = req.params.id;

    try {
        let recruiter = {
            logo: {
                src: req.file.filename,
                alt: req.file.originalname,
            },
            informations: {
                name: req.body.name,
                description: req.body.description,
            },
            contacts: {
                email: req.body.email,
                phone: req.body.phone,
            },
            address: {
                street: req.body.street,
                city: req.body.city,
                zip: req.body.zip,
            },
        };

        await Recruiter.updateOne({ _id: id }, recruiter);
        res.json({ message: "Le recruteur est bien modifié" });
    } catch (err) {
        res.json({
            message: "Le recruteur n'a pas pu être modifié",
            err: err,
        });
    }
};

export const AdminEditRecruiterSubmit = async (req, res) => {
    const id = req.params.id;

    try {
        let recruiter = {
            logo: {
                src: req.file.filename,
                alt: req.file.originalname,
            },
            informations: {
                name: req.body.name,
                description: req.body.description,
            },
            contacts: {
                email: req.body.email,
                phone: req.body.phone,
            },
            address: {
                street: req.body.street,
                city: req.body.city,
                zip: req.body.zip,
            },
            isAdmin: req.body.isAdmin,
        };

        await Recruiter.updateOne({ _id: id }, recruiter);
        res.json({ message: "Le recruteur est bien modifié" });
    } catch (err) {
        res.json({
            message: "Le recruteur n'a pas pu être modifié",
            err: err,
        });
    }
};

export const DeleteRecruiter = async (req, res) => {
    const id = req.params.id;

    try {
        let recruiter = await Recruiter.findById(id);
        if (!recruiter) {
            return res.json({ message: "Ce recruteur n'existe pas" });
        } else {
            await Recruiter.deleteOne({ _id: id });
            res.json({ message: "Le recruteur est bien supprimé" });
        }
    } catch (err) {
        res.json({
            message: "Le recruteur n'a pas pu être supprimé",
            err: err,
        });
    }
};