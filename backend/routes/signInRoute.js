import { Router } from 'express';
import signupuser from '../controllers/signUpController.js';
import { upload } from '../cloudinary/cloudinaryConfig.js';

const router = Router();

router.post('/', upload.single('images') , signupuser);

export default router;