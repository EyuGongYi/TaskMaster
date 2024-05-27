import { Router } from "express";
import { getUserByID, getUsers } from "../handler/users";

const userRouter = Router();

userRouter.use((req, res, next) => {
    if(req.user) next();
    else res.send(401);
});

// /api/users
userRouter.get("/", getUsers);

// /api/users/123
userRouter.get("/:id", getUserByID);

export default userRouter;