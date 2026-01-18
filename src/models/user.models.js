import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    FullName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar: {
        type: String, //cloudinary url
        required: true,
    },
    bio: {
        type: String,
        default: ""
    },
    coverImage: {
        type: String,
        default: ""
    },
    watchHistory: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Video",
        default: []
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: 6,
    },
    refreshToken: {
        type: String,
        default: null,
    }
}, { timestamps: true })


//hooks
//pre save hook to hash password before saving user
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})


//methods
//method to compare password for login validation
userSchema.methods.isCorrectPassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}

// method to generate JWT token for authentication
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        {
            userId: this._id,
            userName: this.userName
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRE }
    );
    return token;
}
// method to generate refresh token
userSchema.methods.generateRefreshToken = function () {
    const refreshToken = jwt.sign(
        {
            userId: this._id,
            userName: this.userName
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRE }
    );
    return refreshToken;
}

//differnce between JWT auth token and refresh token
// JWT auth token is used for authentication and is short-lived
// Refresh token is used to generate a new JWT auth token and is long-lived

export const User = mongoose.model("User", userSchema)