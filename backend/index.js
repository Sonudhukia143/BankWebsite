import express from 'express';
import mongoose from 'mongoose';
import mongoSanitize from 'express-mongo-sanitize';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';

import logInRouter from './routes/logInRoute.js';
import logout from './routes/logout.js';
import signUpRouter from './routes/signInRoute.js';

if (process.env.NODE_ENV !== "production") {
    dotenv.config();
}

const connectDb = async () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_ATLAS_URL); //add ssl on deploying
        console.log("Connected to the database.");
    } catch (error) {
        console.log("Error in establishing connection with the database: " + error);
    }
};
connectDb();

const app = express();
const Port = 3000;

console.log("data here ");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(mongoSanitize());
app.use(cookieParser());
const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200, 
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
};
app.use(cors(corsOptions));

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 3,
    message: { message: 'Too many login attempts, please try agian' },
    standardHeaders: true,
    legacyHeaders: true
})

app.use('/api/login',limiter , logInRouter);
app.use('/api/logout' , limiter ,limiter,logout);
app.use('/api/signin' , limiter ,signUpRouter);

app.use('*', (req, res) => {
    res.send("could not find the page");
})

  app.listen(Port, () => {
      console.log("Server running on " + Port);
  });

// export default async (req, res) => {
//     await connectDb(); 
//     return app(req, res); 
// };