import { Router } from "express";
import { getUserByUsername, getUserUsername, setUserUsername } from "../handler/users";
import passport from "passport";

const userRouter = Router();

userRouter.use(passport.authenticate("jwt", {session: false}));

// /api/users/username
userRouter.get("/username", getUserUsername);
userRouter.post("/username", setUserUsername)
// /api/users/123
userRouter.get("/:username", getUserByUsername);

export default userRouter;