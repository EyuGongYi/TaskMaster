import { Request, Response } from "express-serve-static-core";
import { GoogleUser } from "../dB/schemas/GoogleUser";
import { EditUserDto } from "../dtos/EditUser.dto";


export function getUserUsername(request: Request, response: Response) {
    const userDb: any = request.user;
    response.send(userDb.displayName);
};

export async function setUserUsername(request: Request<{},{}, EditUserDto>, response: Response) {
    const userDb: any = request.user;
    await GoogleUser.updateOne({_id: userDb._id}, {username: request.body.username});
    response.sendStatus(201);
};

export async function getUserByUsername(request: Request, response: Response) {
    const temp = await GoogleUser.find({googleId: request.url.split("/").pop()}).lean();
    const result = temp.map(x => [x.googleId, x.createdAt]); 
    response.send(result);
};

