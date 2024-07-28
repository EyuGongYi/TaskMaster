import axios from "axios";
import * as SecureStore from "expo-secure-store";

export async function login(email: string, password: string) {
    try {
        console.log(process.env.EXPO_PUBLIC_PORTURL);
        const res = await axios.post( process.env.EXPO_PUBLIC_PORTURL+ "/api/auth/login", {
            email: email,
            password: password,
        })
        console.log(res.data.success);
        if (res.data.success) {
            await SecureStore.setItemAsync("Token", res.data.token);
            return true;
        } else return false;
    } catch (err) {
        return false;
    }
};

export async function isLoggedIn() {
    try {
        const token = await SecureStore.getItemAsync("Token");
        console.log(token);
        console.log(process.env.EXPO_PUBLIC_PORTURL);
        const response = await axios.get( process.env.EXPO_PUBLIC_PORTURL +'/api/auth/isLoggedIn', {
            headers: {
                "Authorization": token
            }
        });
        //console.log(response.data.success);
        return response.data.success;
      } catch (error) {
        console.error('Error checking if user is logged in:', error);
      }
}