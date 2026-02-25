import jwt from "jsonwebtoken";
import type { TokenService } from "../../domain/services/TokenService.js";
import type { AuthPayload } from "../../domain/types/auth.js";
import type { PublicUser } from "../../domain/entities/User.js";

export class JwtTokenService implements TokenService {
  constructor(
    private readonly secret: string
  ){}

  generate = async (payload: PublicUser) => {
    return jwt.sign(payload, this.secret, { expiresIn: '1h' })
  }

  verify = async (token: string) => {
    const payload = jwt.verify(token, this.secret)
    if(typeof payload === 'string') {
      throw new Error('Invalid token payload')
    }

    return payload as AuthPayload
  }
}