import "dotenv/config";
import express from "express";
import userRouter from "./router/users";
import authRouter from "./router/auth";
import passport from "passport";
import "./strategies/local";
import "./strategies/jwt";
import "dotenv/config";
import cors from "cors";
import session from "express-session";

declare module "express-session" {
    interface SessionData {
        state: string;
    }
}

// Creates a Express Application
export function createApp() {
    
    // Init Application
    const app = express();
    app.use(cors());
    
    //Middlewares
    // allow receiving of json (Middleware)
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    
    app.use(passport.initialize());
    app.use(session(
        {
            secret: process.env.SESSION_SECRET ||"ADD ur secret into .env",
            resave: false,
            saveUninitialized: false,
        })
    );

    
    //Registering of routers
    app.use("/api/users", userRouter);
    app.use("/api/auth", authRouter);

    return app;
}

