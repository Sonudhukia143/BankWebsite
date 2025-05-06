import { Router } from 'express';
import ApprooveWallet from '../controllers/approoveWallet.js';

const router = Router();

router.post('/' ,ApprooveWallet);

export default router;