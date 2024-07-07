import { auth } from "@/firebaseConfig";


export async function getUsers(query: string | string[] | undefined) {
    const res = await fetch(process.env.EXPO_PUBLIC_SERVER_URL! + "/api/users/" + query,{
        method: "GET",
        headers: {
            Authorization: `Bearer ${await auth.currentUser!.getIdToken()}`,
        },
    });
    console.log(await res.json());
}