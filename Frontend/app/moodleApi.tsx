import axios from 'axios';
import { Assignment, Announcement } from '@/types/canvas';

const MOODLE_BASE_URL = 'https://taskmaster.moodlecloud.com/webservice/rest/server.php';

export const moodleConfig = {
  clientId: "440741138939-g7m56n3ae167drmia894fmvnpm888j0e.apps.googleusercontent.com",
  redirectUrl: 'https://taskmaster.moodlecloud.com/admin/oauth2callback.php',
  scopes: ['openid', 'profile'],
  serviceConfiguration: {
    authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenEndpoint: 'https://oauth2.googleapis.com/token',
  },
};

export const fetchAssignments = async (accessToken: string): Promise<Assignment[]> => {
  try {
    const response = await axios.get(`${MOODLE_BASE_URL}`, {
      params: {
        wstoken: accessToken,
        wsfunction: 'mod_assign_get_assignments',
        moodlewsrestformat: 'json',
      },
    });
    const courses = response.data.courses;
    return courses.flatMap((course: any) => course.assignments || []);
  } catch (error) {
    console.error('Error fetching assignments:', error);
    return [];
  }
};

export const fetchAnnouncements = async (accessToken: string): Promise<Announcement[]> => {
  try {
    const response = await axios.get(`${MOODLE_BASE_URL}`, {
      params: {
        wstoken: accessToken,
        wsfunction: 'mod_forum_get_forum_discussions',
        moodlewsrestformat: 'json',
      },
    });
    return response.data.discussions.map((d: any) => ({
      id: d.discussion,
      subject: d.subject,
      message: d.message,
      timecreated: d.created,
    }));
  } catch (error) {
    console.error('Error fetching announcements:', error);
    return [];
  }
};