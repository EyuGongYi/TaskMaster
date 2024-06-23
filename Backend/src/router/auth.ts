import { Router } from "express";
import { createUser, googleLoginRedirect, googleLogin, isLoggedIn, loginUser } from "../handler/auth";
import passport from "passport";

// /api/auth
const authRouter = Router();

// /api/auth/register
authRouter.post("/register", createUser);

// /api/auth/login
authRouter.post("/login", loginUser);

// /api/auth/google
authRouter.get("/google", googleLogin);

// /api/auth/googleRedirect
authRouter.get("/googleRedirect", googleLoginRedirect);

// /api/auth/isLoggedIn
authRouter.get("/isLoggedIn", passport.authenticate("jwt", {session: false}), isLoggedIn);



export default authRouter;