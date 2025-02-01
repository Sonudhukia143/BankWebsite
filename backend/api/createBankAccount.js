import express from 'express';
import createBankRouter from '../routes/createBankAccount.js';

const app = express();
app.use(express.json());
app.use('/', createBankRouter);

export default app;