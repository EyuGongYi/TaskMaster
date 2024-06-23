import { Request, Response } from "express-serve-static-core";
import { CreateUserDto } from "../dtos/CreateUser.dto";
import { CreateUserQueryParams } from "../types/query-params";
import { User } from "../dB/schemas/User";
import { comparePassword, hashPassword } from "../utils/helper";
import * as jwt from "jsonwebtoken";
import "dotenv/config";
import {google} from "googleapis";
import * as Crypto from "crypto";
import * as url from "url";

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.SERVER_URL + "/api/auth/googleRedirect",
  );

export async function createUser(request: Request<{},{}, CreateUserDto, CreateUserQueryParams>, response: Response) {
    const {email} = request.body;
    const userDB  = await  User.findOne({email});
    if (userDB) {
        response.status(400).send({msg: "User already exists!"});
    } else {
        const password = hashPassword(request.body.password);
        await User.create({email, password});
        response.sendStatus(201);
    }

};

export async function loginUser(request: Request<{},{}, CreateUserDto, CreateUserQueryParams>, response: Response) {
    User.findOne({email: request.body.email}).then(user => {
        if (!user) {
            return response.status(401).send({
                success: false,
                message: "No user found.",
            })
        }

        if (!comparePassword(request.body.password, user.password)){
            return response.status(401).send({
                success: false,
                message: "Wrong Password.",
            })
        }

        const payload = {
            email: user.email,
            username: user.username,
            id: user._id,
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET!, {expiresIn: "7d"});

        return response.status(200).send({
            success: true,
            message: "Logged in successfully",
            token: "Bearer " + token,
        })
    });
}

export async function isLoggedIn(request: Request, response: Response) {
    return response.status(200).send({
        success: true
    })
}

export async function googleLoginRedirect(request: Request, response: Response) {
    let q: any = url.parse(request.url, true).query;
    if (q.error) { // An error response e.g. error=access_denied
        return response.redirect("exp://192.168.1.69:8081?success=false&&message=access_denied");
    } else if (q.state !== request.session.state) { //check state value
        return response.end('State mismatch. Possible CSRF attack');
    } else {
        // Get access and refresh tokens
        let { tokens } = await oauth2Client.getToken({code: q.code});
        const user: any = request.user;
        console.log("requestuser: "+ user);
        if (user) {
            console.log("email: "+ user.email);
            await User.findOneAndUpdate(user.email, {googleAccessToken: tokens.access_token, googleRefreshToken: tokens.refresh_token});
        } else {
            console.log("hello");
            return response.redirect("exp://192.168.1.69:8081?success=false&&message=NotInSession");
        }
        oauth2Client.setCredentials(tokens);
        console.log("2");
        return response.redirect("exp://192.168.1.69:8081?success=true&&message=LoggedIn");
    }
    
}
export async function googleLogin(request: Request, response: Response) {
    console.log(process.env.SERVER_URL + "/auth/googleRedirect");
      
      // Access scopes for read-only Drive activity.
      const scopes = [
        "profile",
        "openid"
      ];
      
      // Generate a secure random state value.
      const state = Crypto.randomBytes(32).toString('hex');
      
      // Store state in DB
      request.session.state = state;
      
      // Generate a url that asks permissions for the Drive activity scope
      const authorizationUrl = oauth2Client.generateAuthUrl({
        // 'online' (default) or 'offline' (gets refresh_token)
        access_type: 'offline',
        /** Pass in the scopes array defined above.
          * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
        scope: scopes,
        // Enable incremental authorization. Recommended as a best practice.
        include_granted_scopes: true,
        // Include the state parameter to reduce the risk of CSRF attacks.
        state: state
      });
      response.redirect(authorizationUrl);
}