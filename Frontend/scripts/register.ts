import axios from 'axios';

export default async function register(email: string, password: string) {
    try {
        const res = await axios.post(process.env.EXPO_PUBLIC_PORTURL + "/api/auth/register", {
            email: email,
            password : password,
        });
        return res.status === 201;
    } catch (err) {
        return false;
    }
};