
import { Request, Response } from "express-serve-static-core";
import * as Admin from "firebase-admin";
import {getFirestore} from "firebase-admin/firestore";
import { UserRecord } from "firebase-admin/lib/auth/user-record";
import { oauth2Client } from "../utils/googleoauth";
import { google } from "googleapis";

export async function getUserByUsername(request: Request, response: Response) {
    const {username} = request.params;
    try {
        let users:any[] = [];
        let nextPageToken;
    
        do {
          const listUsersResult: any = await Admin.auth().listUsers(1000, nextPageToken);
          if (username === " ") {
            listUsersResult.users.forEach((userRecord: UserRecord) => {
                users.push({
                    uid: userRecord.uid,
                    displayName: userRecord.displayName, 
                    email: userRecord.email,
                    photoURL : userRecord.photoURL
                });
              });
          }
          else {listUsersResult.users.forEach((userRecord: UserRecord) => {
            if (userRecord.displayName && userRecord.displayName.toUpperCase().includes(username.toUpperCase())) {
                users.push({
                    uid: userRecord.providerData[0].uid,
                    displayName: userRecord.displayName, 
                    email: userRecord.email,
                    photoURL : userRecord.photoURL
                });
            }
          });
          }
          nextPageToken = listUsersResult.pageToken;
        } while (nextPageToken);
   
    
        response.status(200).send(users);
      } catch (error) {
        response.status(500).send(error);
      }
};

// saves offlineToken into dB
export async function offlineToken(request: Request, response:Response) {
  try {
    let {tokens} = await oauth2Client.getToken(request.body.offlineToken);
    const db = getFirestore();
    db.collection("userEvents").doc(request.body.uid).update({offlineToken: tokens.refresh_token});
    response.send("success");
  } catch (e) {
    response.send(e);
  }
}

// Get AccessToken from OfflineToken
export async function accessToken(request: Request, response: Response) {
  const db = getFirestore();
  const docSnap = await db.collection("userEvents").doc(request.body.user.uid).get();
  try {
    if (docSnap.exists && docSnap.data() && docSnap.data()!.offlineToken) {
      oauth2Client.setCredentials({refresh_token: docSnap.data()!.offlineToken});
      const {credentials} = await oauth2Client.refreshAccessToken();
      oauth2Client.setCredentials(credentials);
    } else {
      throw new Error("Missing doc / offlineToken");
    }
  } catch (e) {
    console.log(e);
    response.status(500).send(e);
  }
  
}

//returns freeBusy array of User calendar
export async function freeBusy(request: Request, response: Response) {
  await accessToken(request, response);
  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
  const freeBusyQuery =  {
    timeMin: request.body.startTime,
    timeMax: request.body.endTime, 
    items: [{"id": request.body.calendarId}]
  };
  try {
    console.log(freeBusyQuery);
    const res = await calendar.freebusy.query({requestBody: freeBusyQuery});
    console.log(res.data.calendars![request.body.calendarId].busy);
    return response.json(res.data.calendars);
  } catch (error) {
    console.error("Error querying free/busy info", error);
    return response.status(500).send("Error querying free/busy info");
  }
}

