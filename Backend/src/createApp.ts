import "dotenv/config";
import express from "express";
import userRouter from "./router/users";
import authRouter from "./router/auth";
import passport from "passport";
import "./strategies/local";
import session from "express-session";
import MongoStore from "connect-mongo";
import "dotenv/config";
import cors from "cors";

// Creates a Express Application
export function createApp() {
    // Init Application
    const app = express();
    app.use(cors());
    
    //Middlewares
    // allow receiving of json (Middleware)
    app.use(express.json());

    app.use(session(
        {
            secret: process.env.SESSION_SECRET ||"ADD ur secret into .env",
            resave: false,
            saveUninitialized: false,
            store: MongoStore.create({
                mongoUrl: process.env.DB_URL ||"ADD ur DBUrl into .env",
            }),
        })
    );
    
    app.use(passport.initialize());
    app.use(passport.session());
    
    //Registering of routers
    app.use("/api/users", userRouter);
    app.use("/api/auth", authRouter);

    return app;
}

