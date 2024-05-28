import { Request, Response } from "express-serve-static-core";


export async function getUserUsername(request: Request, response: Response) {
    const userDb: any = request.user;
    response.send(userDb.username);
};

export function getUserByID(request: Request, response: Response) {
    response.send({});
};

