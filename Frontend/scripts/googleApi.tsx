import { auth, db } from "@/firebaseConfig";
import { GoogleEventType, Interval } from "@/types/event";
import User from "@/types/user";
import { User as authUser } from "firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";




export async function getCalendarEvents(user: User): Promise<GoogleEventType[]> {
    const userRef = doc(db,"userEvents", user.uid);
    const docSnap = await getDoc(userRef);
    const calendarId = docSnap.data()!.calendarId;
    const res = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${((await GoogleSignin.getTokens())).accessToken}`,
        },
    });
    const data = await res.json();
    return data.items.map((event: any) => ({
        eventId: event.id,
        eventName: event.summary,
        eventDetail: event.description || '',
        eventStart: new Date(event.start.dateTime),
        eventEnd: new Date(event.end.dateTime),
    }));
}

const userEventRef = collection(db, "userEvents");

// Creates a TaskMaster calendar for the user if it doesn't exist
export async function createUserCalendar(user: authUser) {
    if (user) {
        const userRef = doc(db, "userEvents", user.providerData[0].uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists() && docSnap.data().calendarId) {
            return;
        }
        const res = await fetch("https://www.googleapis.com/calendar/v3/calendars", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${(await GoogleSignin.getTokens()).accessToken}`,
            },
            body: JSON.stringify({summary: "TaskMaster Calendar"}),
        });
        if (!res.ok) {
            throw new Error("Calendar creation failed");
        }
        const data = await res.json();
        await updateDoc(userRef, { calendarId: data.id });
    }
    
}

export async function createGoogleEvent(user: User, eventName: string, eventStart: Date, eventEnd: Date, eventDetail: string): Promise<GoogleEventType | null> {
    try {
        const docSnap = await getDoc(doc(db, "userEvents", user.uid));
        if (docSnap.exists() && docSnap.data().calendarId) {
            const res = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${docSnap.data().calendarId}/events`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${(await GoogleSignin.getTokens()).accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    end: { dateTime: eventEnd.toISOString() },
                    start: { dateTime: eventStart.toISOString() },
                    summary: eventName,
                    transparency: "opaque",
                    description: eventDetail,
                }),
            });
            if (!res.ok) {
                console.error("Creating Google Event Failed");
                return null;
            }
            const data = await res.json();
            return {
                eventId: data.id,
                eventName: data.summary,
                eventDetail: data.description,
                eventStart: new Date(data.start.dateTime),
                eventEnd: new Date(data.end.dateTime),
            };
        } else {
            console.error("CalendarId missing");
            return null;
      }
    } catch (error) {
        console.error("Error creating Google Event:", error);
        return null;
    }
}

// Retrieves free time slots for multiple users
export async function getFreeTime(users: User[], startTiming: string, endTiming: string) {
    const intervals = users.map(async user => {
        const userRef = doc(db, "userEvents", user.uid);
        const docSnap = await getDoc(userRef);
        const calendarId = docSnap.data()!.calendarId;
        const res = await fetch(process.env.EXPO_PUBLIC_SERVER_URL! + "/api/users/freeBusy", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${await auth.currentUser!.getIdToken()}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                calendarId,
                user,
                startTime: startTiming,
                endTime: endTiming,
            }),
        });
        const data = await res.json();
        return data[calendarId].busy;
    });
    const inter = await Promise.all(intervals);
    const res = inter.flat().map(intervals => ({
        start: new Date(intervals.start),
        end: new Date(intervals.end),
    }));
    res.sort((a, b) => a.start.getTime() - b.start.getTime());
    const combined: Interval[] = [];
    let current = res[0];
    for (let i = 1; i < res.length; i++) {
        if (current.end >= res[i].start) {
            current.end = new Date(Math.max(current.end.getTime(), res[i].end.getTime()));
        } else {
            combined.push({ start: current.start.toISOString(), end: current.end.toISOString() });
            current = res[i];
        }
    }
    combined.push({ start: current.start.toISOString(), end: current.end.toISOString() });
    const free = [];
    let curr = startTiming;
    for (let i = 0; i < combined.length; i++) {
        free.push({ start: curr, end: combined[i].start });
        curr = combined[i].end;
    }
    free.push({ start: curr, end: endTiming });
    return free;
}

// Sets offline token for the user
export async function setOfflineToken(userId: string) {
    const res = await fetch(process.env.EXPO_PUBLIC_SERVER_URL! + "/api/users/offlineToken", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${await auth.currentUser!.getIdToken()}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ offlineToken: GoogleSignin.getCurrentUser()!.serverAuthCode!, uid: userId }),
    });
    return res.ok && res.status == 200;
}