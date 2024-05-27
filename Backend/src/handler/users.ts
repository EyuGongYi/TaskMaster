import { Request, Response } from "express-serve-static-core";


export async function getUsers(request: Request, response: Response) {
    response.send(request.user);
};

export function getUserByID(request: Request, response: Response) {
    response.send({});
};

