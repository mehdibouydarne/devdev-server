import multer from "multer";
import path from "path";

// Définit la taille maximale d'un fichier
const maxSize = 5242880;

// Configure le storage engine
const storageEngine = multer.diskStorage({
    destination: "./public/assets/img",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname.split(" ").join("_")}`);
    },
});

// Vérifie le type de fichier uploadé
const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|webp/;
    const extName = path.extname(file.originalname).toLowerCase();
    const mimeType = fileTypes.test(file.mimetype);

    if (mimeType && extName) {
        cb(null, true);
    } else {
        cb(new Error("Format de fichier non supporté"));
    }
};

// Initialise multer
const upload = multer({
    storage: storageEngine,
    limits: {
        fileSize: maxSize,
    },
    fileFilter: fileFilter,
});

export default upload;
