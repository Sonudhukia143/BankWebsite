import { User, validateUser } from '../models/userModel.js'
import bcrypt from 'bcrypt';

const signupuser = async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { username, gmail, password } = req.body;

    try {
        const existingUser = await User.findOne({ $or: [{ username }, { gmail }] });
        if (existingUser) {
            return res.status(400).send("Username or email already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, gmail, password: hashedPassword });

        await newUser.save();

        req.session.user = { id: newUser._id , gmail: newUser.gmail };

        req.session.save((err) => {
            if (err) {
                return res.status(500).send({ message: 'Session error' });
            }

            return res.status(200).json({ message: 'Login successful' });
        });
    } catch (error) {
        if (error) {
            return res.status(400).send("Username or email already exists");
        }
        res.status(500).send("Internal server error");
    }
}

export default signupuser;

