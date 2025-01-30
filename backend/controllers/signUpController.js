import { User, validateUser } from '../models/userModel.js'
import bcrypt from 'bcrypt';
import generateToken from '../utils/webtoken.js';

const signupuser = async (req, res) => {
    if (!req.file) return res.status(400).json({ "message": "Please upload an image" });
    const image = {
        url: req.file.path,
        filename: req.file.filename
    };

    const user = {
        username: req.body.username,
        gmail: req.body.gmail,
        password: req.body.password,
        Bio: req.body.Bio,
        images: [image]
    };

    const {error,value} = validateUser(user);
    if(error) return res.status(400).json({ "message": "error in validating the user data" + error.details[0].message });

    const { username, gmail, password , Bio , images} = value;

    try {
        const existingUser = await User.findOne({ $or: [{ username }, { gmail }] });
        if (existingUser) {
            return res.status(400).json({ "message": "Username or email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, gmail, password: hashedPassword, images, Bio });

        await newUser.save();

        const token = generateToken(newUser._id);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'None',
            maxAge: 24 * 60 * 60 * 1000,
            path:'/',
        });

        return res.status(200).json({ message: 'Login successful' });

    }
    catch (error) {

        if (error) {
            return res.status(500).json({ message:"Unexpecected Server error" + error.message });
        }
    }
}

export default signupuser;

