import { Request, Response } from "express-serve-static-core";
import { User } from "../dB/schemas/User";
import { EditUserDto } from "../dtos/EditUser.dto";


export function getUserUsername(request: Request, response: Response) {
    const userDb: any = request.user;
    response.status(200).send({username: userDb.username});
};

export async function setUserUsername(request: Request<{},{}, EditUserDto>, response: Response) {
    const userDb: any = request.user;
    await User.updateOne({_id: userDb._id}, {username: request.body.username});
    response.sendStatus(201);
};

export async function getUserByUsername(request: Request, response: Response) {
    const temp = await User.find({username: request.url.split("/").pop()}).lean();
    const result = temp.map(x => [x.username, x.email]); 
    response.send(result);
};

