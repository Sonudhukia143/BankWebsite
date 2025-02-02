import { Router } from 'express';
import createBankAccount from '../controllers/createBankAccount.js';

const router = Router();

router.post('/' ,createBankAccount);

export default router;