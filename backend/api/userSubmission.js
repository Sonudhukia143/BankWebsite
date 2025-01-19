import express from 'express';
import userSubmission from '../routes/userSubmissionRoute.js';

const app = express();
app.use(express.json());

app.use('/', userSubmission);

export default app;