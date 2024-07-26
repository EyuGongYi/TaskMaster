import { google } from "googleapis";
import "dotenv/config";

export const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_WEB_ID,
    process.env.GOOGLE_SECRET,
    ""
  );