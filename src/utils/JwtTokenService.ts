import jwt from "jsonwebtoken";
import type { TokenService } from "../domain/services/TokenService.js";

export class JwtTokenService implements TokenService {
  constructor(
    private readonly secret: string
  ){}

  generate = async (payload: object) => {
    return jwt.sign(payload, this.secret, { expiresIn: '1h' })
  }

  verify = async (token: string) => {
    return jwt.verify(token, this.secret)
  }
}