import axios from "axios";
import * as SecureStore from "expo-secure-store";

export default async function getUsername() {
    try {
        const res = await axios.get(process.env.EXPO_PUBLIC_PORTURL + "/api/users/username", {
            headers: {
                "Authorization": SecureStore.getItem("Token")
            }
        })
        .then(response => response.data);
        return res;
    } catch (err) {
        console.log(err);
        return "Failure";
    }
}