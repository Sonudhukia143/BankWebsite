import { Router } from 'express';
import createBankAccount from '../controllers/createBankAccount.js';
import authMiddleware from '../middlewares/checkAuth.js';

const router = Router();

router.post('/', authMiddleware ,createBankAccount);

export default router;