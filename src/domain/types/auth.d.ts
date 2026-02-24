import type { PublicUser } from "../entities/User.js"

type AuthPayload = {
  accessToken: string
  user: PublicUser
}