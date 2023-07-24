import mongoose from "mongoose";
import bcrypt from "bcrypt";

let schoolSchema = mongoose.Schema(
    {
        logo: {
            src: String,
            alt: String,
        },
        informations: {
            name: String,
            yearofcreation: String,
            description: String,
        },
        contacts: {
            email: {
                type: String,
                unique: true,
                lowercase: true,
            },
            phone: String,
        },
        address: {
            street: String,
            city: String,
            zip: String,
        },
        password: String,
        userType: String,
        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

schoolSchema.pre("save", function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

let School = mongoose.model("School", schoolSchema);

export default School;
