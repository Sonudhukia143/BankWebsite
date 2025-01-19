// backend/models/userModel.js
import mongoose from "mongoose";
import Joi from "joi";

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    gmail: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
});

const User = mongoose.model("User", userSchema);

const validateUser = (user) => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(30).required(),
        gmail: Joi.string().email().required(),
        password: Joi.string().min(8).required()
    });
    return schema.validate(user);
};

export { User, validateUser };
