import axios from 'axios';
import { Assignment, Announcement } from '@/types/canvas';

const MOODLE_BASE_URL = 'https://taskmaster.moodlecloud.com/webservice/rest/server.php';
const MOODLE_TOKEN = '09449447b99d1e0e1408c7d2c28fe76a';

export const authenticateUser = async (username: string, password: string): Promise<string | null> => {
    try {
      const response = await axios.post(`${MOODLE_BASE_URL}?wsfunction=auth_userkey_request_login_url&moodlewsrestformat=json`, {
        username,
        password,
      });
      return response.data.token;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  
  export const fetchAssignments = async (token: string): Promise<Assignment[]> => {
    try {
      const response = await axios.get(`${MOODLE_BASE_URL}?wstoken=${token}&wsfunction=mod_assign_get_assignments&moodlewsrestformat=json`);
      const courses = response.data.courses;
      let assignments: Assignment[] = [];
  
      courses.forEach((course: any) => {
        assignments = [...assignments, ...course.assignments];
      });
  
      return assignments;
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  
  export const fetchAnnouncements = async (token: string): Promise<Announcement[]> => {
    try {
      const response = await axios.get(`${MOODLE_BASE_URL}?wstoken=${token}&wsfunction=mod_forum_get_forum_discussions&moodlewsrestformat=json`);
      const discussions = response.data.discussions;
      let announcements: Announcement[] = [];
  
      discussions.forEach((discussion: any) => {
        announcements.push({
          id: discussion.discussion,
          subject: discussion.subject,
          message: discussion.message,
          timecreated: discussion.created,
        });
      });
  
      return announcements;
    } catch (error) {
      console.error(error);
      return [];
    }
  };