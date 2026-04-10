import type { PublicUser } from "../entities/User.js"

type AuthPayload = {
  user: PublicUser
  iat: number
  exp: number
}