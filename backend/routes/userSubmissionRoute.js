import express from 'express';
import userSubmission from '../controllers/userSubmission.js';
import { upload } from '../cloudinary/cloudinaryConfig.js';

const router = express.Router();

router.post('/'  ,upload.array('images',10) ,userSubmission);

export default router;