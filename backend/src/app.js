import express from "express";
import morgan from "morgan";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { config } from "./config/config.js";
import cookieParser from "cookie-parser";
import authRouter from './routes/auth.routes.js';
import routerAi from "./routes/ai.routes.js";
import cors from 'cors';


const app = express();

// Middleware
app.use(morgan('dev'));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    secure: false
  })
);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());


// Google Authentication Middleware
passport.use(new GoogleStrategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: config.GOOGLE_CALLBACK_URL,
}, (accessToken, refreshToken, profile, done) => {
    console.log("Access token: ", accessToken);
    console.log("Refresh token: ",refreshToken);
    return done(null, profile);
}));

app.use(passport.initialize());

// Routes Middleware
app.use('/api/auth', authRouter);
app.use('/api/ai', routerAi);




export default app;