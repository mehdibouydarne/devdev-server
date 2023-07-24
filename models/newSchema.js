import mongoose from "mongoose";

let newSchema = mongoose.Schema({
    title: String,
    author: String,
    date: Date,
    introduction: String,
    content: String,
    image: {
        src: String,
        alt: String,
    },
})

let New = mongoose.model("New", newSchema);

export default New