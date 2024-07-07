import { Request, Response } from "express-serve-static-core";
import * as Admin from "firebase-admin";
import { UserRecord } from "firebase-admin/lib/auth/user-record";

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
                    photoUrl : userRecord.photoURL
                });
              });
          }
          else {listUsersResult.users.forEach((userRecord: UserRecord) => {
            if (userRecord.displayName && userRecord.displayName.toUpperCase().includes(username.toUpperCase())) {
                users.push({
                    uid: userRecord.uid,
                    displayName: userRecord.displayName, 
                    email: userRecord.email,
                    photoUrl : userRecord.photoURL
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

