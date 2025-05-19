import express from 'express';
import saveWallet from '../routes/saveWallet.js';

const app = express();
app.use(express.json());
app.use('/', saveWallet);

export default app;