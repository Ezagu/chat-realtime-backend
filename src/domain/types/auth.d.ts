import type { PublicUser } from "../entities/User.js"

type AuthPayload = PublicUser & {iat: number, exp: number}