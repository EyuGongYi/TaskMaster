import { auth, db } from "@/firebaseConfig";
import { GoogleEventType, Interval } from "@/types/event";
import User from "@/types/user";
import {User as authUser} from "firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";




export async function getCalendarEvents(user: User) {
    const userRef = doc(db,"userEvents", user.uid);
    const docSnap = await getDoc(userRef);
    const calendarId = docSnap.data()!.calendarId;
    const res = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,{
        method: "GET",
        headers: {
            Authorization: `Bearer ${((await GoogleSignin.getTokens())).accessToken}`,
        },
    });
    const data = await res.json();
    return data.items;
}
const userEventRef = collection(db, "userEvents");

export async function createUserCalendar(user: authUser) {
    if (user) {
        const userRef =doc(db, "userEvents", user.providerData[0].uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists() && docSnap.data().calendarId) {
            return;
        }
        //Create TaskMaster Calendar
        const res = await fetch("https://www.googleapis.com/calendar/v3/calendars",{
            method: "POST",
            headers: {
                Authorization: `Bearer ${(await GoogleSignin.getTokens()).accessToken}`,
            },
            body: JSON.stringify({summary: "TaskMaster Calendar"}),
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else{ 
                throw new Error("Calendar creation failed");
            }})
            .then(data => {
                //set Calendar id into userEvents
                updateDoc(userRef, {
                    calendarId: data.id,
                });
                console.log("updateed");
            })
            .catch(e => console.log(e));  
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

/** 
 * FreeBusy
 * @param startTiming  earliest time to check
 * @param endTiming Last timing to check
 * @param users Array of users to check
 * 
 * @returns Array of free timing
*/
export async function getFreeTime(users: User[], startTiming: string, endTiming: string) {
    //Becomes an array of busy start and end time in date format
    const intervals = users.map(async user => {
        const userRef = doc(db,"userEvents", user.uid);
        const docSnap = await getDoc(userRef);
        const calendarId = docSnap.data()!.calendarId;
        const res = await fetch(process.env.EXPO_PUBLIC_SERVER_URL! + "/api/users/freeBusy",{
            method: "POST",
            headers: {
                Authorization: `Bearer ${await auth.currentUser!.getIdToken()}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "calendarId": calendarId,
                "user": user,
                "startTime": startTiming,
                "endTime": endTiming,

            }),
        })
        const data = await res.json();
        const ans = data[calendarId].busy;
        return ans;
    });
    const inter  = await Promise.all(intervals);
    const res = inter.flatMap(intervals => {
        return intervals;
    }).map(intervals => {
        return ({
            start: new Date(intervals.start),
            end: new Date(intervals.end)
        })
    });
    //sort array
    res.sort((a, b) => a.start.getTime() - b.start.getTime());
    res.forEach(entry => console.log(entry.start));
    const combined: Interval[] = [];
    let current = res[0];

    for (let i = 1; i < res.length; i++) {
        if (current.end >= res[i].start) {
          // If intervals overlap or are adjacent, merge them
          current.end = new Date(Math.max(current.end.getTime(), res[i].end.getTime()));
        } else {
          // If they don't overlap, push the current interval and move to the next
          combined.push({
            start: current.start.toISOString(),
            end: current.end.toISOString()
          });
          current = res[i];
        }
      }
    
    combined.push({
        start: current.start.toISOString(),
        end: current.end.toISOString()
    });
    const free = [];
    let curr = startTiming;
    for (let i = 0; i < combined.length; i++) {
        free.push({
            start: curr,
            end: combined[i].start
        });
        curr = combined[i].end;
    }
    free.push({
        start: curr,
        end: endTiming
    })
    return free;

}


/**
 * Set Offline Token 
 * @description sets user offline token into the db
 * @param user current user details
 * @returns void
 */
export async function setOfflineToken(userId: string) {
    const res = await fetch(process.env.EXPO_PUBLIC_SERVER_URL! + "/api/users/offlineToken",{
        method: "POST",
        headers: {
            Authorization: `Bearer ${await auth.currentUser!.getIdToken()}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({"offlineToken": GoogleSignin.getCurrentUser()!.serverAuthCode!, "uid": userId}),
    });
    if (res.ok && res.status == 200) {
        return true;
    } else {
        return false;
    }
}

