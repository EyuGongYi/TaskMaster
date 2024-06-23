import { Strategy, ExtractJwt } from "passport-jwt";
import "dotenv/config";
import passport from "passport";
import { User } from "../dB/schemas/User";
import { response } from "express";

const passportJWTOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET!,
    ignoreExpiration: true,
}
passport.use(new Strategy(passportJWTOptions, function(jwt_payload, done) {
    try {
        User.findOne({_id: jwt_payload.id}).then((user) => {
            if (!user) {
                return response.status(401);
            }
            return done(null, user);
        })
    } catch (err) {
        return done(err, false);
    }
}));