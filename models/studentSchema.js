import mongoose from "mongoose";
import bcrypt from "bcrypt";

let studentSchema = mongoose.Schema(
    {
        informations: {
            salutation: String,
            name: String,
            firstname: String,
        },
        contacts: {
            email: {
                type: String,
                unique: true,
                lowercase: true,
                required: true
            },
            phone: String,
        },
        address: {
            zip: String,
        },
        password: String,
        newsletter: Boolean,
        userType : String,
        isAdmin: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
    }
);

studentSchema.pre("save", function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

let Student = mongoose.model("Student", studentSchema);

export default Student;
