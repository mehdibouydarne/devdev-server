import jwt from "jsonwebtoken";

import Job from "../models/jobSchema.js";

export const AddJobSubmit = async (req, res) => {
    try {
        let job = {
            recruiter: req.body.recruiter,
            rinformations: {
                rname: req.body.rname,
                rcity: req.body.rcity,
                rlogo: {
                    src: req.body.src,
                    alt: req.body.alt,
                },
            },
            informations: {
                name: req.body.name,
                presentation: req.body.presentation,
                duration: req.body.duration,
                languages: req.body.languages,
            },
            contacts: {
                link: req.body.link,
            },
        };
        let newJob = new Job(job);

        await newJob.save();
        res.json({ message: "Le poste est bien enregistré" });
    } catch (err) {
        res.json({
            message: "Le poste n'a pas pu être enregistré",
            err: err,
        });
    }
};

export const GetJobs = async (req, res) => {
    try {
        let jobs = await Job.find();

        if (!jobs) {
            return res.json({ message: "Aucun poste à afficher" });
        } else {
            res.json(jobs);
        }
    } catch (err) {
        res.json({ message: "Impossible d'afficher les postes", err: err });
    }
};

export const GetJobsByRecruiter = async (req, res) => {
    const authToken = req.headers.authorization;
    const token = authToken && authToken.split(" ")[1];
    let decodedToken = jwt.verify(token, "mon_secret");
    let id = decodedToken.id;

    try {
        let jobs = await Job.find({ recruiter: id });

        if (!jobs) {
            return res.json({ message: "Aucun poste à afficher" });
        } else {
            res.json(jobs);
        }
    } catch (err) {
        res.json({ message: "Impossible d'afficher les postes", err: err });
    }
};

export const GetJob = async (req, res) => {
    const id = req.params.id;

    try {
        let job = await Job.findById(id);
        if (!job) {
            return res.json({ message: "Ce poste n'existe pas" });
        } else {
            res.json(job);
        }
    } catch (err) {
        res.json({ message: "Impossible d'afficher le poste", err: err });
    }
};

export const EditJobSubmit = async (req, res) => {
    const id = req.params.id;

    try {
        let job = {
            informations: {
                name: req.body.name,
                presentation: req.body.presentation,
                duration: req.body.duration,
                languages: req.body.languages,
            },
            contacts: {
                link: req.body.link,
            },
        };

        await Job.updateOne({ _id: id }, job);
        res.json({ message: "Le poste est bien modifié." });
    } catch (err) {
        res.json({
            message: "Le poste n'a pas pu être modifié.",
            err: err,
        });
    }
};

export const DeleteJob = async (req, res) => {
    const id = req.params.id;

    try {
        let job = await Job.findById(id);

        if (!job) {
            return res.json({ message: "Ce poste n'existe pas" });
        } else {
            await Job.deleteOne({ _id: id });
        }
    } catch (err) {
        res.json({ message: "Le poste n'a pas pu être supprimé", err: err });
    }
};