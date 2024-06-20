import { Router } from "express";
import { isLoggedIn, loginUser } from "../handler/auth";
import passport from "passport";
import "dotenv/config";

// /api/auth
const authRouter = Router();

// /api/auth/login
authRouter.get('/google', (req, res, next) => {
    const { redirect_uri } = req.query as { redirect_uri: string };
    console.log(redirect_uri);
    (req.session as any).redirect_uri = redirect_uri;
    passport.authenticate('google', { scope: ['profile', 'email'], accessType: "offline" })(req, res, next);
  });

authRouter.get("/google/redirect", passport.authenticate("google"), (req, res) => res.redirect((req.session as any).redirect_uri));

// /api/auth/login
authRouter.get("/isLoggedIn", isLoggedIn);

export default authRouter;