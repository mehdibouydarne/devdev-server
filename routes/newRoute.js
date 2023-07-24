import express from "express";

import upload from "../middlewares/multer.js";

import { isAdmin, verifyToken } from "../middlewares/authJwt.js";
import {
    AddNewSubmit,
    DeleteNew,
    EditNewSubmit,
    GetNew,
    GetNews,
} from "../controllers/news.js";

const router = express.Router();

router.post("/add-new", verifyToken, isAdmin, upload.single("image"), AddNewSubmit);

router.get("/", GetNews);

router.get("/:id", GetNew);

router.put("/edit-post/:id", verifyToken, isAdmin, upload.single("image"), EditNewSubmit);

router.delete("/delete-post/:id", verifyToken, isAdmin, DeleteNew);

export default router;