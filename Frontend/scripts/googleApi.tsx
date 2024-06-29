import { GoogleSignin } from "@react-native-google-signin/google-signin";

const tokens = GoogleSignin.getTokens();

export async function getCalendarEvents() {
    const res = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events",{
        method: "GET",
        headers: {
            Authorization: `Bearer ${(await tokens).accessToken}`,
        },
    });
    const data = await res.json();
    return data.items;

}