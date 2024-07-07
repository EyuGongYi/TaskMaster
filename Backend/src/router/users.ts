import { Router } from "express";
import { getUserByUsername} from "../handler/users";
import passport from "passport";
import { verifyToken } from "../strategies/firebase";

const userRouter = Router();

userRouter.use(verifyToken);

// /api/users/123
userRouter.get("/:username", getUserByUsername);

export default userRouter;