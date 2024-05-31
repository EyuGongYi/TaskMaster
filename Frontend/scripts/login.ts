import axios from "axios";



export default async function login(email: string, password: string) {
    try {
        const res = await axios.post( process.env.EXPO_PUBLIC_PORTURL+ "/api/auth/login", {
            email: email,
            password: password,
        })
        .then(response => response.status);
        if (res == 201) return true;
        else return false;
    } catch (err) {
        return false;
    }
}