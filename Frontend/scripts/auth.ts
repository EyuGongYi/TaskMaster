import axios from "axios";

export async function login(email: string, password: string) {
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
};

export async function register(email: string, password: string) {
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

export async function isLoggedIn() {
    try {
        const response = await axios.get( process.env.EXPO_PUBLIC_PORTURL+'/api/auth/isLoggedIn' );
        return response.data.isLoggedIn;
      } catch (error) {
        console.error('Error checking if user is logged in:', error);
      }
}