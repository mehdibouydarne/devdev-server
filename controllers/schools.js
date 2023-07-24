import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import School from "../models/schoolSchema.js";

export const RegisterSchoolSubmit = async (req, res) => {
    try {
        let user = await School.findOne({ email: req.body.email });
        // let verifyPassword =
        //     /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$/;

        if (user) {
            return res.json({
                message:
                    "Vous avez déjà un compte enregistré avec cette adresse mail",
            });
        }

        // if (!verifyPassword.test(req.body.password)) {
        //     return res.json({
        //         message:
        //             "Le mot de passe ne respecte pas les conditions: 8 caractères incluant majuscule, minuscule et caractères spéciaux",
        //     });
        // }

        let school;
        if (req.file) {
            school = {
                logo: {
                    src: req.file.filename,
                    alt: req.file.originalname,
                },
                informations: {
                    name: req.body.name,
                    yearofcreation: req.body.yearofcreation,
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
            school = {
                logo: {
                    src: "img-default.png",
                    alt: "default image",
                },
                informations: {
                    name: req.body.name,
                    yearofcreation: req.body.yearofcreation,
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
        let newSchool = new School(school);

        await newSchool.save();
        res.json({ message: "L'école est bien enregistrée" });
    } catch (err) {
        res.json({
            message: "L'école n'a pas pu être enregistrée",
            err: err,
        });
    }
};

export const LoginSchoolSubmit = async (req, res) => {
    let user = await School.findOne({ "contacts.email": req.body.email });

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
                        yearofcreation: user.informations.yearofcreation,
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

export const GetSchools = async (req, res) => {
    try {
        let schools = await School.find();
        if (!schools) {
            return res.json({ message: "Aucune êcole à afficher" });
        } else {
            res.json(schools);
        }
    } catch (err) {
        res.json({ message: "Impossible d'afficher les écoles", err: err });
    }
};

export const GetSchool = async (req, res) => {
    const id = req.params.id;

    try {
        let school = await School.findById(id);
        if (!school) {
            return res.json({ message: "Cette école n'existe pas" });
        } else {
            res.json(school);
        }
    } catch (err) {
        res.json({ message: "Impossible d'afficher l'école", err: err });
    }
};

export const EditSchoolSubmit = async (req, res) => {
    const id = req.params.id;

    try {
        let school = {
            logo: {
                src: req.file.filename,
                alt: req.file.originalname,
            },
            informations: {
                name: req.body.name,
                yearofcreation: req.body.yearofcreation,
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

        await School.updateOne({ _id: id }, school);
        res.json({ message: "L'école est bien modifiée" });
    } catch (err) {
        res.json({
            message: "L'école n'a pas pu être modifiée",
            err: err,
        });
    }
};

export const AdminEditSchoolSubmit = async (req, res) => {
    const id = req.params.id;

    try {
        let school = {
            logo: {
                src: req.file.filename,
                alt: req.file.originalname,
            },
            informations: {
                name: req.body.name,
                yearofcreation: req.body.yearofcreation,
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

        await School.updateOne({ _id: id }, school);
        res.json({ message: "L'école est bien modifiée" });
    } catch (err) {
        res.json({
            message: "L'école n'a pas pu être modifiée",
            err: err,
        });
    }
};

export const DeleteSchool = async (req, res) => {
    const id = req.params.id;

    try {
        let school = await School.findById(id);
        if (!school) {
            return res.json({ message: "Cette école n'existe pas" });
        } else {
            await School.deleteOne({ _id: id });
            res.json({ message: "L'école est bien supprimée" });
        }
    } catch (err) {
        res.json({ message: "L'école n'a pas pu être supprimée", err: err });
    }
};