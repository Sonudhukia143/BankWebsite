import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization");
    console.log(token);

    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JSON_WEB_SECRET);

        const user = await User.findById(decoded.id).select("-password"); // Exclude the password field
        if(!user) res.status(401).json({ "message":"User Not Found"})

        req.user = user._id;
        req.accountHolderName = user.username;
        console.log(req.user);
        next();
    } catch (err) {
        res.status(401).json({ message: "Token is not valid" });
    }
};

export default authMiddleware;