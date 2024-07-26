import { NextFunction, Request, Response } from "express";
import * as Admin from "firebase-admin";

export async function verifyToken(req: Request, res: Response, next: NextFunction) {
    const idToken = req.headers.authorization?.split('Bearer ')[1];
    if (!idToken) {
      return res.status(401).send('Unauthorized');
    }
  
    try {
      const decodedToken = await Admin.auth().verifyIdToken(idToken);
      req.user = decodedToken;
      next();
    } catch (error) {
      return res.status(401).send('Unauthorized');
    }
  }