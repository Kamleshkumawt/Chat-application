import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    fullname: {
        type: 'string',
        required: true,
        minlength: [3, 'Fullname must be at least 3 characters long'],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        lowercase: true,
        minlength:[6, 'Email must be at least 6 characters long'],
    },
    password: {
        type: String,
        required: true,
        minlength: [4, 'Password must be at least 8 characters long'],
        //match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    },
    image: {
        type: String,
    },
}, {
    timestamps: true,
    versionKey: false,
    minimize: false,
    strict: false,
    // collection: "users"
})


userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10);
}

userSchema.methods.isValidPassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateJWT = function() {
    return  jwt.sign({email: this.email}, process.env.JWT_SECRET,{expiresIn: '24h'});
}


const User = mongoose.model("user", userSchema);

export default User;