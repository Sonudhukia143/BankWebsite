import express from 'express';
import approveWallet from '../routes/approoveWallet.js';

const app = express();
app.use(express.json());
app.use('/', approveWallet);

export default app;