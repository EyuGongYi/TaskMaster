import { Request, Response } from "express-serve-static-core";
import { CreateUserDto } from "../dtos/CreateUser.dto";
import { CreateUserQueryParams } from "../types/query-params";

export async function loginUser(request: Request<{},{}, CreateUserDto, CreateUserQueryParams>, response: Response) {
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