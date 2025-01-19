import express from 'express';
import getUserSubmissions from '../controllers/userSubmissionGet.js';

const router = express.Router();

router.get('/' , getUserSubmissions);

export default router;