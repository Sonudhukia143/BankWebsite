import express from 'express';
import getBankAccounts from '../routes/getBankAccount.js'

const app = express();
app.use(express.json());
app.use('/', getBankAccounts);

export default app;