import type { NextFunction, Request, Response } from "express";
import type { TokenService } from "../../../domain/services/TokenService.js";
import type { PublicUser } from "../../../domain/entities/User.js";

export const authMiddleware = (tokenService: TokenService) => {
  return async(req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.accessToken

    if(!accessToken) {
      return res.status(401).send('Unauthorized')
    }

    try {
      const payload = await tokenService.verify(accessToken);
      const {iat, exp, ...user} = payload
      req.user = user
      next()
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
    
  } 
}