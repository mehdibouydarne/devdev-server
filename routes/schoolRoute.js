import express from "express";

import { isAdmin, verifyToken } from "../middlewares/authJwt.js";
import upload from "../middlewares/multer.js";
import {
    AdminEditSchoolSubmit,
    DeleteSchool,
    EditSchoolSubmit,
    GetSchool,
    GetSchools,
    LoginSchoolSubmit,
    RegisterSchoolSubmit,
} from "../controllers/schools.js";

const router = express.Router();

router.post("/register", upload.single("logo"), RegisterSchoolSubmit);

router.post("/login", LoginSchoolSubmit);

router.get("/", verifyToken, isAdmin, GetSchools);

router.get("/:id", GetSchool);

router.put("/edit-school/:id", verifyToken, upload.single("logo"), EditSchoolSubmit);

router.put("/admin-edit-school/:id", verifyToken, isAdmin, upload.single("logo"), AdminEditSchoolSubmit);

router.delete("/delete-school/:id", verifyToken, isAdmin, DeleteSchool);

export default router;