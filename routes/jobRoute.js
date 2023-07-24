import express from "express";

import { verifyToken } from "../middlewares/authJwt.js";
import {
    AddJobSubmit,
    DeleteJob,
    EditJobSubmit,
    GetJob,
    GetJobs,
    GetJobsByRecruiter,
} from "../controllers/jobs.js";

const router = express.Router();

router.post("/add-job", verifyToken, AddJobSubmit);

router.get("/", GetJobs);

router.get("/by-recruiter/", verifyToken, GetJobsByRecruiter);

router.get("/:id", GetJob);

router.put("/edit-post/:id", verifyToken, EditJobSubmit);

router.delete("/delete-post/:id", verifyToken, DeleteJob);

export default router;