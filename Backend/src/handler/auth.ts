import { Request, Response } from "express-serve-static-core";
import { CreateUserDto } from "../dtos/CreateUser.dto";
import { CreateUserQueryParams } from "../types/query-params";
import { User } from "../dB/schemas/User";
import { hashPassword } from "../utils/helper";

export async function createUser(request: Request<{},{}, CreateUserDto, CreateUserQueryParams>, response: Response) {
    const {email} = request.body;
    const userDB  = await  User.findOne({email});
    if (userDB) {
        response.status(400).send({msg: "User already exists!"});
    } else {
        const password = hashPassword(request.body.password);
        await User.create({email, password});
        response.status(201);
    }

};

export async function loginUser(request: Request<{},{}, CreateUserDto, CreateUserQueryParams>, response: Response) {
    console.log("logged in");
    response.sendStatus(201);
}

export async function isLoggedIn(request: Request, response: Response) {
    if (request.user) response.sendStatus(200);
    else response.sendStatus(401);
}