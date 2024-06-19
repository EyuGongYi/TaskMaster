import { Router } from "express";
import { isLoggedIn, loginUser } from "../handler/auth";
import passport from "passport";
import "dotenv/config";

// /api/auth
const authRouter = Router();

// /api/auth/login
authRouter.get("/google", passport.authenticate("google", 
                                                {scope: ["profile", "email"],
                                                accessType: "offline",
                                                }));
authRouter.get("/google/redirect", passport.authenticate("google", {successRedirect: process.env.CLIENT_URL+"/(screens)"}), loginUser);

// /api/auth/login
authRouter.get("/isLoggedIn", isLoggedIn);

export default authRouter;