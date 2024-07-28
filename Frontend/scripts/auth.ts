import { auth } from "@/firebaseConfig";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

export async function isLoggedIn() {
    const res = await fetch(process.env.EXPO_PUBLIC_SERVER_URL! + "/api/users/loggedIn", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${await auth.currentUser!.getIdToken()}`,
            "Content-Type": "application/json",
        },
    });
    return res.status;
}