import express from "express";

import { isAdmin, verifyToken } from "../middlewares/authJwt.js";
import {
    AdminEditUserSubmit,
    DeleteUser,
    EditUserSubmit,
    GetUser,
    GetUsers,
    LoginUserSubmit,
    RegisterUserSubmit,
} from "../controllers/users.js";

const router = express.Router();

router.post("/register", RegisterUserSubmit);

router.post("/login", LoginUserSubmit);

router.get("/", verifyToken, isAdmin, GetUsers);

router.get("/:id", verifyToken, GetUser);

router.put("/edit-user/:id", verifyToken, EditUserSubmit);

router.put("/admin-edit-user/:id", verifyToken, isAdmin, AdminEditUserSubmit);

router.delete("/delete-user/:id", verifyToken, isAdmin, DeleteUser);

export default router;