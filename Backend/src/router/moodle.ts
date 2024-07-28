import { Router } from "express";
import { verifyToken } from "../strategies/firebase";
import { getUsersMoodle } from "../handler/moodle";

const moodleRouter = Router();

moodleRouter.use(verifyToken);

// /api/moodle/getUsers
moodleRouter.post("/getUsers", getUsersMoodle);



export default moodleRouter;