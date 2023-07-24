import mongoose from "mongoose";
import bcrypt from "bcrypt";

let userSchema = mongoose.Schema(
    {
        informations: {
            name: String,
            firstname: String,
        },
        contact: {
            email: {
                type: String,
                unique: true,
                lowercase: true,
            },
        },
        password: String,
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

userSchema.pre("save", function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

let User = mongoose.model("User", userSchema);

export default User;
