import express from "express";

import { isAdmin, verifyToken } from "../middlewares/authJwt.js";
import {
    AdminEditStudentSubmit,
    DeleteStudent,
    EditStudentSubmit,
    GetStudent,
    GetStudents,
    LoginStudentSubmit,
    RegisterStudentSubmit,
} from "../controllers/students.js";

// Transforme "studentRoute.js" en router
const router = express.Router();

// Route qui permet l'enregistrement d'un nouvel étudiant
router.post("/register", RegisterStudentSubmit);

// Route qui permet la connexion des étudiants
router.post("/login", LoginStudentSubmit);

// Route qui permet de récupérer la liste de tous les étudiants
router.get("/", verifyToken, isAdmin, GetStudents);

// Route qui permet de récupérer un étudiant
router.get("/:id", verifyToken, GetStudent);

// Route qui permet à un étudiant de modifier son profil
router.put("/edit-student/:id", verifyToken, EditStudentSubmit);

// Route qui permet à un admin de modifier un étudiant
router.put("/admin-edit-student/:id", verifyToken, isAdmin, AdminEditStudentSubmit);

// Route qui permet de supprimer un étudiant
router.delete("/delete-student/:id", verifyToken, isAdmin, DeleteStudent);

export default router;