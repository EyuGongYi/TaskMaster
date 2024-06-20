import { Request, Response } from "express-serve-static-core";

export async function loginUser(request: Request, response: Response) {
    console.log("logged in");
    response.sendStatus(200);
}

export async function isLoggedIn(request: Request, response: Response) {
    if (request.user) {
        console.log("User is logged in:", request.user);
        response.status(200).send({ isLoggedIn: true, user: request.user});
    } else {
        console.log("User is not logged in");
        response.status(401).send({ isLoggedIn: false });
    }
}