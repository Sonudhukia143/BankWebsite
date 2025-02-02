import express from 'express';
import adminsRoute from '../routes/adminRoute.js';

const app = express();
app.use(express.json());
app.use('/', adminsRoute);

export default app;