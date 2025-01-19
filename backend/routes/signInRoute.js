import { Router } from 'express';
import signupuser from '../controllers/signUpController.js';

const router = Router();

router.post('/signup',signupuser);

export default router;