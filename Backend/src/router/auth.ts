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
    req.session.redirect_uri = redirect_uri;
    console.log("test");
    console.log(req);
    console.log(req.session);
    passport.authenticate('google', { scope: ['profile', 'email'], accessType: "offline" })(req, res, next);
  });

authRouter.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  res.redirect("exp://192.168.1.69:8081");
});

// /api/auth/login
authRouter.get("/isLoggedIn", isLoggedIn);

export default authRouter;