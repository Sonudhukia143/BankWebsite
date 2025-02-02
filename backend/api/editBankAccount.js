import express from 'express';
import editBankAccount from '../routes/editBankRoute.js';

const app = express();
app.use(express.json());
app.use('/', editBankAccount);

export default app;