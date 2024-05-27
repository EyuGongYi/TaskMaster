import { createApp } from "./createApp";
import "./dB";

//Express js
const PORT = 3000;
const app = createApp();

app.listen(PORT, () => {
    console.log(`${PORT}`);
});