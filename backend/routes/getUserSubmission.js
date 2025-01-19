import express from 'express';
import checkAuth from '../middlewares/checkAuth.js';
import getUserSubmissions from '../controllers/userSubmissionGet.js';

const router = express.Router();

router.get('/submissions' ,checkAuth, getUserSubmissions);

export default router;