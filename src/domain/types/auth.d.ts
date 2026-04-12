import type { PublicUser } from "../entities/User.js"

type AuthPayload = {
  id: string
  username: string
  createdAt: string
  iat: number
  exp: number
}