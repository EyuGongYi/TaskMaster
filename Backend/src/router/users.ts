import { Router } from "express";
import { freeBusy, getUserByUsername, loggedIn, offlineToken} from "../handler/users";
import { verifyToken } from "../strategies/firebase";

const userRouter = Router();

userRouter.use(verifyToken);

// /api/users/123
userRouter.get("/:username", getUserByUsername);
userRouter.post("/offlineToken", offlineToken);
userRouter.post("/freeBusy", freeBusy);
userRouter.get("/loggedIn", loggedIn);


export default userRouter;