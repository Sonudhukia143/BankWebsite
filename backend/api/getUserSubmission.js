import express from 'express';
import getUserSubmissions from '../routes/getUserSubmission.js';

const app = express();
app.use(express.json());
app.use('/', getUserSubmissions);

export default app;
