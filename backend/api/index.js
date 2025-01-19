import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import mongoSanitize from 'express-mongo-sanitize';
import dotenv from 'dotenv';
import expressSession from 'express-session';
import MongoStore from 'connect-mongo';
import cors from 'cors';
import cookieParser from 'cookie-parser';

if (process.env.NODE_ENV !== "production") {
    dotenv.config();
}

import getUserSubmissions from '../routes/getUserSubmission.js';
import logInRouter from '../routes/logInRoute.js';
import logout from '../routes/logout.js';
import signUpRouter from '../routes/signInRoute.js';
import userSubmission from '../routes/userSubmissionRoute.js';

const connectDb = async () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_ATLAS_URL,{
            ssl:true
        });
        console.log("Connected to the database.");
    } catch (error) {
        console.log("Error in establishing connection with the database: " + error);
    }
};

const app = express();
//const Port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(mongoSanitize());
app.use(cookieParser());
const corsOptions = {
    origin: 'https://handlehub.netlify.app',
    optionsSuccessStatus: 200, 
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
};
app.use(cors(corsOptions));

const store = MongoStore.create({
    mongoUrl: process.env.MONGO_ATLAS_URL,
    ttl: 24 * 60 * 60,
    touchAfter: 24 * 60 * 60
});


const sessionConfig = expressSession({
    store: store,
    secret: process.env.SESSION_SECRET,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
        secure: process.env.NODE_ENV === 'production',  
    },
    resave: false,
    saveUninitialized: true
});
app.use(sessionConfig);

app.use('/api/login' , logInRouter);
app.use('/api/logout' , logout);
app.use('/api/signin' , signUpRouter);
app.use('/api/submissions' , userSubmission);
app.use('/api/usersubmission' , getUserSubmissions);
app.use('/api/test' , (req,res) => {
    return res.send("the web service is working");
});

app.use('*', (req, res) => {
    return res.send("could not find the page");
})

//  app.listen(Port, () => {
//      console.log("Server running on " + Port);
//  });

export default async (req, res) => {
    await connectDb(); 
    return app(req, res); 
};