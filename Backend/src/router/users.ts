import { Router } from "express";
import { getUserByUsername, getUserUsername, setUserUsername } from "../handler/users";

const userRouter = Router();

userRouter.use((req, res, next) => {
    if(req.user) next();
    else res.send(401);
});

// /api/users/username
userRouter.get("/username", getUserUsername);
userRouter.post("/username", setUserUsername)
// /api/users/123
userRouter.get("/:username", getUserByUsername);

export default userRouter;