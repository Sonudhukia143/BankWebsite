import express from 'express';
import editBankAccount from '../controllers/editBankAccountController.js';

const router = express.Router();

router.patch('/:id', editBankAccount);

export default router;
