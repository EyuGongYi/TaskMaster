import mongoose from "mongoose";
import dotenv from"dotenv";
dotenv.config();

mongoose
    .connect(process.env.DB_URL || "have db_url in ur .env")
    .then(() => console.log("Connected to db"))
    .catch((e) => console.log(e));

export default mongoose