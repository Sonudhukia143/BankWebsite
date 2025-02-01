import express from 'express';
import mongoose from 'mongoose';
import mongoSanitize from 'express-mongo-sanitize';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

if (process.env.NODE_ENV !== "production") {
    dotenv.config();
}

import logInRouter from '../routes/logInRoute.js';
import logout from '../routes/logout.js';
import signUpRouter from '../routes/signInRoute.js';
import createBankAccount from '../routes/createBankAccount.js';
import authMiddleware from '../middlewares/checkAuth.js';
import getBankAccounts from '../routes/getBankAccount.js';

const connectDb = async () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_ATLAS_URL);
        console.log("Connected to the database.");
    } catch (error) {
        console.log("Error in establishing connection with the database: " + error);
    }
};
//connectDb();

//const Port = 3000;
const app = express();
app.set('trust proxy', true);  

app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());
app.use(cookieParser());

const corsOptions = {
    origin: 'https://mybankweb.netlify.app',   
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    optionsSuccessStatus: 200,
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

app.use('/api/login', logInRouter);
app.use('/api/logout', logout);
app.use('/api/signin' , signUpRouter);
app.use('/api/createaccount', authMiddleware ,createBankAccount);
app.use('/api/user', authMiddleware,getBankAccounts)
app.get('/api/test', (req,res) => {
    res.send("Hello, The Backend Is Working");
});

app.use('*', (req, res) => {
    res.status(404).send("Could not find the page");
});

//  app.listen(Port, () => {
//      console.log("Server running on " + Port);
//  }); 


  export default async function handler (req, res) {
      await connectDb();

     return app(req, res);
  }; 