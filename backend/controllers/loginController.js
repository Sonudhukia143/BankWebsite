import bcrypt from 'bcrypt';
import {User} from '../models/userModel.js';

const loginUser = async (req, res) => {
    const { gmail, password } = req.body;

    try {
        const user = await User.findOne({ gmail });
        if (!user) {
            return res.status(400).send({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ message: 'Invalid credentials' });
        }

        req.session.user = { id: user._id , gmail: user.gmail };

        req.session.save((err) => {
            if (err) {
                return res.status(500).send({ message: 'Session error' });
            }

            return res.status(200).json({ message: 'Login successful' });
        });

    } catch (error) {
        return res.status(500).send({ message: 'Server error' });
    }
};

export default loginUser;
