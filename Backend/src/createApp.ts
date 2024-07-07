import "dotenv/config";
import express from "express";
import userRouter from "./router/users";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import * as Admin from "firebase-admin";

declare module "express-session" {
    interface SessionData {
        state: string;
    }
}

// Creates a Express Application
export function createApp() {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT!);
    Admin.initializeApp({
        credential: Admin.credential.cert(serviceAccount)
    });
    // Init Application
    const app = express();
    app.use(cors());
    
    //Middlewares
    // allow receiving of json (Middleware)
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    
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

    
    //Registering of routers
    app.use("/api/users", userRouter);

    return app;
}
