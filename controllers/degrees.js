import jwt from "jsonwebtoken";

import Degree from "../models/degreeSchema.js";

export const AddDegreeSubmit = async (req, res) => {
    try {
        let degree = {
            school: req.body.school,
            informations: {
                name: req.body.name,
                duration: req.body.duration,
                fees: req.body.fees,
                languages: req.body.languages,
            },
            comments: [
                {
                    pseudo: req.body.pseudo,
                    content: req.body.content,
                    date: new Date(),
                },
            ],
        };
        let newDegree = new Degree(degree);

        await newDegree.save();
        res.json({ message: "Le diplôme est bien enregistré" });
    } catch (err) {
        res.json({
            message: "Le diplôme n'a pas pu être enregistré",
            err: err,
        });
    }
};

export const GetDegrees = async (req, res) => {
    try {
        let degrees = await Degree.find().populate("school");

        if (!degrees) {
            return res.json({ message: "Aucun diplôme à afficher" });
        } else {
            res.json(degrees);
        }
    } catch (err) {
        res.json({ message: "Impossible d'afficher les diplômes", err: err });
    }
};

export const GetDegreesBySchool = async (req, res) => {
    const authToken = req.headers.authorization;
    const token = authToken && authToken.split(" ")[1];
    let decodedToken = jwt.verify(token, "mon_secret");
    let id = decodedToken.id;

    try {
        let degrees = await Degree.find({ school: id });

        if (!degrees) {
            return res.json({ message: "Aucun diplôme à afficher" });
        } else {
            res.json(degrees);
        }
    } catch (err) {
        res.json({ message: "Impossible d'afficher les diplômes", err: err });
    }
};

export const GetDegree = async (req, res) => {
    const id = req.params.id;

    try {
        let degree = await Degree.findById(id);
        if (!degree) {
            return res.json({ message: "Ce diplôme n'existe pas" });
        } else {
            res.json(degree);
        }
    } catch (err) {
        res.json({ message: "Impossible d'afficher le diplôme", err: err });
    }
};

export const EditDegreeSubmit = async (req, res) => {
    const id = req.params.id;

    try {
        let degree = {
            informations: {
                name: req.body.name,
                duration: req.body.duration,
                fees: req.body.fees,
                languages: req.body.languages,
            },
            comments: [
                {
                    pseudo: req.body.pseudo,
                    content: req.body.content,
                    date: new Date(),
                },
            ],
        };

        await Degree.updateOne({ _id: id }, degree);
        res.json({ message: "Le diplôme est bien modifié." });
    } catch (err) {
        res.json({
            message: "Le diplôme n'a pas pu être modifié.",
            err: err,
        });
    }
};

export const DeleteDegree = async (req, res) => {
    const id = req.params.id;

    try {
        let degree = await Degree.findById(id);

        if (!degree) {
            return res.json({ message: "Ce diplôme n'existe pas" });
        } else {
            await Degree.deleteOne({ _id: id });
            res.json({ message: "Le diplôme est bien supprimé" });
        }
    } catch (err) {
        res.json({
            message: "Le diplôme n'a pas pu être supprimé",
            err: err,
        });
    }
};