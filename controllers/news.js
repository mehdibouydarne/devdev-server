import New from "../models/newSchema.js";

// Permet de créer un nouvel article
export const AddNewSubmit = async (req, res) => {
    try {
        let new_;
        if (req.file) {
            new_ = {
                title: req.body.title,
                author: req.body.author,
                date: new Date(),
                introduction: req.body.introduction,
                content: req.body.content,
                image: {
                    src: req.file.filename,
                    alt: req.file.originalname,
                },
            };
        } else {
            new_ = {
                title: req.body.title,
                author: req.body.author,
                date: new Date(),
                introduction: req.body.introduction,
                content: req.body.content,
                image: {
                    src: "img-default.png",
                    alt: "default image",
                },
            };
        }
        let newNew = new New(new_);

        await newNew.save();
        res.json({ message: "L'article est bien enregistré" });
    } catch (err) {
        res.json({
            message: "L'article n'a pas pu être enregistré",
            err: err,
        });
    }
};

// Permet de récupérer tous les articles
export const GetNews = async (req, res) => {
    try {
        let news = await New.find();

        if (!news) {
            return res.json({ message: "Aucun article à afficher" });
        } else {
            res.json(news);
        }
    } catch (err) {
        res.json({ message: "Impossible d'afficher les articles", err: err });
    }
};

// Permet de récupérer un article
export const GetNew = async (req, res) => {
    const id = req.params.id;

    try {
        let new_ = await New.findById(id);
        if (!new_) {
            return res.json({ message: "Cet article n'existe pas" });
        } else {
            res.json(new_);
        }
    } catch (err) {
        res.json({ message: "Impossible d'afficher l'article", err: err });
    }
};

// Permet de modifier un article
export const EditNewSubmit = async (req, res) => {
    const id = req.params.id;

    try {
        let new_ = {
            title: req.body.title,
            author: req.body.author,
            date: new Date(),
            introduction: req.body.introduction,
            content: req.body.content,
            image: {
                src: req.file.filename,
                alt: req.file.originalname,
            },
        };

        await New.updateOne({ _id: id }, new_);
        res.json({ message: "L'article est bien modifié" });
    } catch (err) {
        res.json({
            message: "L'article n'a pas pu être modifié",
            err: err,
        });
    }
};

// Permet de supprimer un article
export const DeleteNew = async (req, res) => {
    const id = req.params.id;

    try {
        let new_ = await New.findById(id);

        if (!new_) {
            return res.json({ message: "Cet article n'existe pas" });
        } else {
            await New.deleteOne({ _id: id });
            res.json({ message: "L'article est bien supprimé" });
        }
    } catch (err) {
        res.json({ message: "L'article n'a pas pu être supprimé", err: err });
    }
};