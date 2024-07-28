import axios from 'axios';
import { Assignment, Announcement } from '@/types/canvas';
import { auth, db } from '@/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';


export const moodleConfig = {
  MOODLE_BASE_URL : 'https://taskmasterr.moodlecloud.com',
  loginUrl: `https://taskmasterr.moodlecloud.com/login/token.php`,
  service: "tm",
  serverUrl: "https://taskmasterr.moodlecloud.com/webservice/rest/server.php",
  token: "cb108c8cca3354fafe21151afec6fb76"
};

export async function getUserIdByEmail(email: string) {
  try {
    const params = new URLSearchParams({
        wstoken: moodleConfig.token,
        wsfunction: 'core_user_get_users',
        moodlewsrestformat: 'json',
    });
    params.append('criteria[0][key]', 'email');
    params.append('criteria[0][value]', email);
    const response = await axios.post(moodleConfig.serverUrl, params);


      const data = response.data;
      console.log('User Data:', data);
      if (data && data.users && data.users.length > 0) {
          return data.users[0].id;
      } else {
          console.log('No user found with that email.');
          return null;
      }
  } catch (error) {
      console.error('Error fetching user data:', error);
  }
}
export async function storeMoodleId(id: number) {
    try {
        if (auth.currentUser?.providerData[0].uid) {
            const userRef = doc(db, "userEvents", auth.currentUser.providerData[0].uid);
            await updateDoc(userRef, {moodleID: id});
        }
    } catch (e) {
        console.log("Error updating moodleId",e);
    }
        
}

export async function getUserCourseIDs(): Promise<number[] | undefined> {
  try {
        const docSnap = await getDoc(doc(db, "userEvents", auth.currentUser!.providerData[0].uid));
        if (docSnap.exists() && docSnap.data().moodleID){
            const response = await axios.post(moodleConfig.serverUrl, new URLSearchParams({
                wstoken: moodleConfig.token,
                wsfunction: 'core_enrol_get_users_courses',
                moodlewsrestformat: 'json',
                userid: JSON.stringify(docSnap.data().moodleID)
            }));
            const data = response.data;
            const res: number[] = data.map((course: any) =>course.id);
            return res;
        }else {
            console.log("Missing MoodleId");
        }
  } catch (error) {
      console.error('Error fetching Course ID:', error);
  }
}

export async function getAssignments(courseId: number) {
    try {
        const params = new URLSearchParams({
            wstoken: moodleConfig.token,
            wsfunction: 'mod_assign_get_assignments',
            moodlewsrestformat: 'json',
        });

        params.append("courseids[0]", JSON.stringify(courseId));
        const response = await axios.post(moodleConfig.serverUrl, params );
        const data = response.data;
        return data.courses[0].assignments;
    } catch (e) {
        console.error('Error fetching assignments:', e);
    }
}

export async function getAllAssignments(courseIds: number[]) {
    let res: any[] = [];
    for (let i = 0; i < courseIds.length; i ++ ) {
        const temp = await getAssignments(courseIds[i]);
        res = res.concat(temp);
    }
    return res;
}

export async function getAssignmentStatus(assignmentId: number) {
    try {
        if (auth.currentUser?.providerData[0].uid) {
            const userRef = doc(db, "userEvents", auth.currentUser.providerData[0].uid);
            const docSnap = await getDoc(userRef);
            if (docSnap.exists() && docSnap.data().moodleID) {
                const moodleId = docSnap.data().moodleID;
                const params = new URLSearchParams({
                    wstoken: moodleConfig.token,
                    wsfunction: 'mod_assign_get_submission_status',
                    moodlewsrestformat: 'json',
                    assignid: JSON.stringify(assignmentId),
                    userid: JSON.stringify(moodleId)
                });
                const response = await axios.post(moodleConfig.serverUrl, params );
                const data = response.data;
                return data;
            }
        }
        console.log("Missing MoodleID");    
    } catch (e) {
        console.error('Error fetching assignments:', e);
    }
}

async function getForumDiscussions(forumId: number) {
    try {
        const params = new URLSearchParams({
            wstoken: moodleConfig.token,
            wsfunction: 'mod_forum_get_forum_discussions',
            moodlewsrestformat: 'json',
            forumid: JSON.stringify(forumId)
        });

        const response = await axios.post(moodleConfig.serverUrl, params);
        return response.data.discussions;
    } catch (error) {
        console.error('Error fetching forum discussions:', error);
    }
}

async function getForumsByCourses(courseIds: number[]) {
    try {
        const params = new URLSearchParams({
            wstoken: moodleConfig.token,
            wsfunction: 'mod_forum_get_forums_by_courses',
            moodlewsrestformat: 'json',
        });
        for (let i = 0; i < courseIds.length; i ++) {
            params.append(`courseids[${i}]`, JSON.stringify(courseIds[i]))
        }
        const response = await axios.post(moodleConfig.serverUrl, params);
        return response.data;
    } catch (error) {
        console.error('Error fetching forums:', error);
    }
}

export async function getAllAnnouncements() {
    try {
        const courseIds = await getUserCourseIDs() || [];
        const forums = await getForumsByCourses(courseIds);
        let announcements: any = [];
        for (const forum of forums) {
            if (forum.type === 'news') {
                const discussions = await getForumDiscussions(forum.id);
                announcements = announcements.concat(discussions);
            }
        }
        return announcements;
    } catch (e) {
        console.error('Error getting announcements:', e);
    }
    
}
 