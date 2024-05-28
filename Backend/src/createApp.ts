import "dotenv/config";
import express from "express";
import userRouter from "./router/users";
import authRouter from "./router/auth";
import passport from "passport";
import "./strategies/local";
import session from "express-session";
import MongoStore from "connect-mongo";



// Creates a Express Application
export function createApp() {
    // Init Application
    const app = express();
    
    //Middlewares
    // allow receiving of json (Middleware)
    app.use(express.json());

    app.use(session(
        {
            secret: "yRUGay",
            resave: false,
            saveUninitialized: false,
            store: MongoStore.create({
                mongoUrl: "INSERT URL HERE",
            }),
            cookie: {secure: true}
        })
    );
    
    app.use(passport.initialize());
    app.use(passport.session());
    
    //Registering of routers
    app.use("/api/users", userRouter);
    app.use("/api/auth", authRouter);

    return app;
}

