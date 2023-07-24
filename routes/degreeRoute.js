import express from "express";

import { verifyToken } from "../middlewares/authJwt.js";
import {
    AddDegreeSubmit,
    DeleteDegree,
    EditDegreeSubmit,
    GetDegree,
    GetDegrees,
    GetDegreesBySchool,
} from "../controllers/degrees.js";

const router = express.Router();

router.post("/add-post", verifyToken, AddDegreeSubmit);

router.get("/", GetDegrees);

router.get("/by-school/", verifyToken, GetDegreesBySchool);

router.get("/:id", GetDegree);

router.put("/edit-post/:id", verifyToken, EditDegreeSubmit);

router.delete("/delete-post/:id", verifyToken, DeleteDegree);

export default router;