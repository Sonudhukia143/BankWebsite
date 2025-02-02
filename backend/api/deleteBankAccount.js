import express from 'express';
import deleteAccountRouter from '../routes/deleteBankAccountRouter.js';

const app = express();
app.use(express.json());
app.use('/', deleteAccountRouter);

export default app;