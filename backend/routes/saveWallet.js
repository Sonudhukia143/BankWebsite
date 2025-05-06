import { Router } from 'express';
import SaveWallet from '../controllers/saveWallet.js';

const router = Router();

router.post('/' ,SaveWallet);

export default router;