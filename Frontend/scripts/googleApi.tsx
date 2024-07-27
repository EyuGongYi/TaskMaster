import { db } from "@/firebaseConfig";
import { GoogleEventType } from "@/types/event";
import User from "@/types/user";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";

export async function getCalendarEvents(): Promise<GoogleEventType[]> {
    try {
        const res = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${(await GoogleSignin.getTokens()).accessToken}`,
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            console.error("Failed to fetch Google Calendar events");
            return [];
        }

        const data = await res.json();
        return data.items.map((event: any) => ({
            eventId: event.id,
            eventName: event.summary,
            eventDetail: event.description,
            eventStart: new Date(event.start.dateTime),
            eventEnd: new Date(event.end.dateTime),
            eventDate: new Date(event.start.dateTime),
        }));
    } catch (error) {
        console.error("Error fetching Google Calendar events:", error);
        return [];
    }
}

const userEventRef = collection(db, "userEvents");

export async function createUserCalendar(user: User) {
    if (user) {
        const docSnap = await getDoc(doc(db, "userEvents", user.uid));
        if (docSnap.exists() && docSnap.data().calendarId) {
            return;
        }
        //Create TaskMaster Calendar
        const res = await fetch("https://www.googleapis.com/calendar/v3/calendars", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${(await GoogleSignin.getTokens()).accessToken}`,
            },
            body: JSON.stringify({ summary: "TaskMaster Calendar" }),
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("Calendar creation failed");
            }
        })
            .then(data => {
                //set Calendar id into userEvents
                updateDoc(doc(userEventRef, user.uid), {
                    calendarId: data.id,
                });
            })
            .catch(e => console.log(e));
    }
}

export async function setOfflineToken(user: User) {
    const userRef = doc(db, "userEvents", user.uid);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists() && !docSnap.data().offlineToken) {
        await updateDoc(userRef, {
            offlineToken: GoogleSignin.getCurrentUser()!.serverAuthCode,
        });
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
            const newEvent: GoogleEventType = {
                eventId: data.id,
                eventName: data.summary,
                eventDetail: data.description,
                eventStart: new Date(data.start.dateTime),
                eventEnd: new Date(data.end.dateTime),
                eventDate: new Date(data.start.dateTime),
            };
            return newEvent;
        } else {
            console.error("CalendarId missing");
            return null;
        }
    } catch (error) {
        console.error("Error creating Google Event:", error);
        return null;
    }
}