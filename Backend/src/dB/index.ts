import mongoose from "mongoose";

mongoose
    .connect("INSERT URL HERE")
    .then(() => console.log("Connected to db"))
    .catch((e) => console.log(e));
export default mongoose