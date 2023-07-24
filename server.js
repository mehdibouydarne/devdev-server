import express from "express";
import cors from "cors";
import dotenv from "dotenv"

import { connectdb } from "./config/database.js";
import studentRoute from "./routes/studentRoute.js";
import schoolRoute from "./routes/schoolRoute.js";
import recruiterRoute from "./routes/recruiterRoute.js";
import userRoute from "./routes/userRoute.js";
import newRoute from "./routes/newRoute.js";
import degreeRoute from "./routes/degreeRoute.js";
import jobRoute from "./routes/jobRoute.js";

dotenv.config()
const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
connectdb;

app.use("/student", studentRoute);
app.use("/school", schoolRoute);
app.use("/recruiter", recruiterRoute);
app.use("/user", userRoute);
app.use("/new", newRoute)
app.use("/degree", degreeRoute)
app.use("/job", jobRoute)

app.listen(process.env.PORT, () => console.log(`Le serveur est exécuté à ${process.env.HOST}${process.env.PORT}`));
