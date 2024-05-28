import { Router } from "express";
import { createUser, isLoggedIn, loginUser } from "../handler/auth";
import passport from "passport";

// /api/auth
const authRouter = Router();

// /api/auth/register
authRouter.post("/register", createUser);

// /api/auth/login
authRouter.post("/login", passport.authenticate("local"), loginUser);

authRouter.get("/isLoggedIn", isLoggedIn);

export default authRouter;