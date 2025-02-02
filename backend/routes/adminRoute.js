import { Router } from 'express';
import fetchAllBanks from '../controllers/adminController.js';

const router = Router();

router.get('/' ,fetchAllBanks);

export default router;