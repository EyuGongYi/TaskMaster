import axios from "axios";
import { Request, Response } from "express";

export const moodleConfig = {
    MOODLE_BASE_URL : 'https://taskmasterr.moodlecloud.com',
    loginUrl: `https://taskmasterr.moodlecloud.com/login/token.php`,
    service: "tm",
    serverUrl: "https://taskmasterr.moodlecloud.com/webservice/rest/server.php",
    token: "cb108c8cca3354fafe21151afec6fb76"
  };

export async function getUsersMoodle(request: Request, response: Response) {
    const email = request.body.email;
    console.log(email);
    try {
        const params = new URLSearchParams({
            wstoken: moodleConfig.token,
            wsfunction: 'core_user_get_users',
            moodlewsrestformat: 'json',
        });
        params.append('criteria[0][key]', 'email');
        params.append('criteria[0][value]', email);

        const res = await axios.post(moodleConfig.serverUrl, params);
        response.json(res.data);
        console.log(res.data);
    } catch (error) {
        response.status(500).json({ error });
    }
} 