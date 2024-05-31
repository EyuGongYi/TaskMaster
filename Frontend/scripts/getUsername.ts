import axios from "axios";

export default async function getUsername() {
    try {
        const res: string= await axios.get(process.env.EXPO_PUBLIC_PORTURL + "/api/users/username")
        .then(response => response.data);
        return res;
    } catch (err) {
        console.log(err);
        return "failure";
    }
}