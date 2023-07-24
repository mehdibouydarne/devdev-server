import mongoose from "mongoose";

let degreeSchema = mongoose.Schema({
    school: {
        type: mongoose.Types.ObjectId,
        ref: "School",
    },
    informations: {
        name: String,
        duration: String,
        fees: Number,
        languages: String,
    },
    comments: [
        {
            pseudo: String,
            content: String,
            date: Date,
        },
    ],
});

let Degree = mongoose.model("Degree", degreeSchema);

export default Degree;
