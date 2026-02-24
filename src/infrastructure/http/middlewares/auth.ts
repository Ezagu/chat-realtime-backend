import type { NextFunction, Request, Response } from "express";
import type { TokenService } from "../../../domain/services/TokenService.js";
import type { AuthPayload } from "../../../domain/types/auth.js";

export const authMiddleware = (tokenService: TokenService) => {
  return async(req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.accessToken

    if(!accessToken) {
      return res.status(401).send('Unauthorized')
    }

    try {
      const payload: AuthPayload= await tokenService.verify(accessToken);
      req.user = payload.user
      next()
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
    
  } 
}