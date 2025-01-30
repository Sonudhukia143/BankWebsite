import { User,validateUser } from "../models/userModel.js";

export default async function validateSignInUser(req,res,next) {
    console.log(req);
    try {
        const user = {
            username: req.body.username,
            gmail: req.body.gmail,
            password: req.body.password,
            Bio: req.body.Bio,
            images: ["here will be the image url that will be uploaded"]
        };

        const { error } = validateUser(user);
        if (error) return res.status(400).json({ "message": JSON.stringify(error.details[0].message) });

        const existingUser = await User.findOne({ $or: [{ username: user.username }, { gmail: user.gmail }] });
        if (existingUser) {
            return res.status(400).json({ "message": "Username or email already exists" });
        }

        // If user data is valid, proceed with image upload
        next();
    } catch (error) {
        return res.status(500).json({ message: "Unexpected Server error: " + error.message });
    }
}
