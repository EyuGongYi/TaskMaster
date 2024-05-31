import axios from "axios";

export default async function getUsername() {
    try {
        const res: string= await axios.get(process.env.PORTURL + "/api/users/username")
        .then(response => response.data);
        return res;
    } catch (err) {
        return "failure";
    }
}