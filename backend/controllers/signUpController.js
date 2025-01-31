import * as formidable from 'formidable';
import { User, validateUser } from '../models/userModel.js';
import bcrypt from 'bcrypt';
import generateToken from '../utils/webtoken.js';
import { cloudinary } from '../cloudinary/cloudinaryConfig.js';

const signupuser = async (req, res) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = "./uploads";
    form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.error('Error parsing form data:', err);
            return res.status(400).json({ message: 'Error parsing form data' });
        }

        const { username, gmail, password, Bio } = fields;
        const imageFile = files.images;

        if (!imageFile) {
            return res.status(400).json({ message: 'Please upload an image' });
        }

        try {
            // Upload the image to Cloudinary
            const imageUploadResult = await cloudinary.uploader.upload(imageFile[0].filepath, {
                resource_type: 'auto',
                folder: 'BankWeb',
            });

            const image = {
                url: imageUploadResult.url,
                filename: imageUploadResult.public_id,
            };

            const formData = {
                username: Array.isArray(fields.username) ? fields.username[0] : fields.username,
                gmail: Array.isArray(fields.gmail) ? fields.gmail[0] : fields.gmail,
                password: Array.isArray(fields.password) ? fields.password[0] : fields.password,
                Bio: Array.isArray(fields.Bio) ? fields.Bio[0] : fields.Bio,
            };
            const user = { ...formData , images: [image] };

            // Validate user input
            const { error, value } = validateUser(user);
            if (error) {
                console.log('Validation Error:', error);
                return res.status(400).json({ message: 'Validation error: ' + error.details[0].message });
            }

            // Check if the user already exists
            const existingUser = await User.findOne({ $or: [{ username }, { gmail }] });
            if (existingUser) {
                return res.status(400).json({ message: 'Username or email already exists' });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(user.password, 10);

            const newUser = new User({
                username:user.username,
                gmail:user.gmail,
                password:hashedPassword,
                images:user.images,
                Bio:user.Bio,
            });

            await newUser.save();

            // Generate token
            const token = generateToken(newUser._id);

            // Send response with token as cookie
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'None',
                maxAge: 24 * 60 * 60 * 1000,
                path: '/',
            });

            return res.status(200).json({ message: 'Signup successful' });
        } catch (error) {
            console.error('Unexpected error:', error);
            return res.status(500).json({ message: 'Unexpected server error: ' + error.message });
        }
    });
};

export default signupuser;
