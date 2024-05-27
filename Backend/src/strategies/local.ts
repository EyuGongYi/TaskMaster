import passport from "passport";
import { Strategy } from "passport-local";
import { User } from "../dB/schemas/User";
import { comparePassword } from "../utils/helper";

// TODO: update user type
passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
    try {
        const user = await User.findById(id);
        if (!user) throw new Error("User not found");
        done(null, user);
    } catch(e) {
        done(e, null);
    }
});

passport.use(
    new Strategy(
        {
            usernameField: "email",
        },
        async (email, password, done) => {
            try {
                const findUser = await User.findOne({email});
                if (!findUser) throw new Error("User not found");
                if (!comparePassword(password, findUser.password))
                    throw new Error("Bad Credentials");
                console.log("Success");
                done(null, findUser);
            } catch (err) {
                console.log("Skill issued");
                done(err, false);
            }
        }
    )
);
