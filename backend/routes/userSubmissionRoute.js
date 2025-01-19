import express from 'express';
import checkAuth from '../middlewares/checkAuth.js';
import userSubmission from '../controllers/userSubmission.js';
import { upload } from '../cloudinary/cloudinaryConfig.js';

const router = express.Router();

router.post('/' , checkAuth ,upload.array('images',10) ,userSubmission);

export default router;