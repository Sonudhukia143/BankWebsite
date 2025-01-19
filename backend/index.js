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

const app = express();
//const Port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(mongoSanitize());
app.use(cookieParser());
const corsOptions = {
    origin: 'http://localhost:5173',
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

app.use('*', (req, res) => {
    res.send("could not find the page");
})

//  app.listen(Port, () => {
//      console.log("Server running on " + Port);
//  });

export default async (req, res) => {
    await connectDb(); 
    return app(req, res); 
};