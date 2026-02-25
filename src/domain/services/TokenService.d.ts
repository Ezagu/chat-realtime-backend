import type { PublicUser } from "../entities/User.js"
import type { AuthPayload } from "../types/auth.js"

export interface TokenService {
  generate: (payload: PublicUser) => Promise<string>
  verify: (token: string) => Promise<AuthPayload>
}