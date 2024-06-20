import { Strategy } from "passport-google-oauth20";
import "dotenv/config";
import { GoogleUser } from "../dB/schemas/GoogleUser";
import passport from "passport";

passport.serializeUser((user: any, cb) => {
    cb(null, user.id);
});
passport.deserializeUser(async (id, cb) => {
    try {
        const findUser = await GoogleUser.findById(id);
        return findUser? cb(null, findUser): cb(null, null);
    } catch (err) {
        cb(err, null);
    }
});

passport.use(new Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID || "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    callbackURL: process.env.SERVER_URL + "/api/auth/google/redirect"
    },
    async (accessToken, refreshToken, profile, cb) => {
        try {
            const findUser = await GoogleUser.findOne({ googleId: profile.id });
            if (!findUser) {
                const newUser = new GoogleUser({
                    googleId: profile.id,
                    refreshToken: refreshToken,
                    accessToken: accessToken,
                    displayName: profile.displayName,
                });
                const newSavedUser = await newUser.save();
                return cb(null, newSavedUser);
            }
            console.log(refreshToken);
            
            return cb(null, findUser);
            
        } catch (err) {
            console.log(err);
            return cb(err, false);
        }
      }
));