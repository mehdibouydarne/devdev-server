import mongoose from "mongoose";

let jobSchema = mongoose.Schema({
    recruiter: {
        type: mongoose.Types.ObjectId,
        ref: "Recruiter",
    },
    rinformations: {
        rname: String,
        rcity: String,
        rlogo: {
            src: String,
            alt: String,
        },
    },
    informations: {
        name: String,
        presentation: String,
        duration: String,
        languages: String,
    },
    contacts: {
        link: String,
    },
});

let Job = mongoose.model("Job", jobSchema);

export default Job;
