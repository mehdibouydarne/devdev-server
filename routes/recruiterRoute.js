import express from "express";

import { isAdmin, verifyToken } from "../middlewares/authJwt.js";
import upload from "../middlewares/multer.js";
import {
    AdminEditRecruiterSubmit,
    DeleteRecruiter,
    EditRecruiterSubmit,
    GetRecruiter,
    GetRecruiters,
    LoginRecruiterSubmit,
    RegisterRecruiterSubmit,
} from "../controllers/recruiters.js";

const router = express.Router();

router.post("/register", upload.single("logo"), RegisterRecruiterSubmit);

router.post("/login", LoginRecruiterSubmit);

router.get("/", verifyToken, isAdmin, GetRecruiters);

router.get("/:id", GetRecruiter);

router.put("/edit-recruiter/:id", verifyToken, upload.single("logo"), EditRecruiterSubmit);

router.put("/admin-edit-recruiter/:id", verifyToken, isAdmin, upload.single("logo"), AdminEditRecruiterSubmit);

router.delete("/delete-recruiter/:id", verifyToken, isAdmin, DeleteRecruiter);

export default router;