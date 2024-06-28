import { Router } from "express";
import { createUser, isLoggedIn, loginUser } from "../handler/auth";
import { createEvent, getEvents } from "../handler/event";
import passport from "passport";

// /api/auth
const authRouter = Router();

// /api/auth/register
authRouter.post("/register", createUser);

// /api/auth/login
authRouter.post("/login", passport.authenticate("local"), loginUser);

// /api/auth/login
authRouter.get("/isLoggedIn", isLoggedIn);

// /api/auth/createEvent
authRouter.post('/createEvent', createEvent);

// /api/auth/getEvents
authRouter.get('/getEvents', getEvents);

export default authRouter;