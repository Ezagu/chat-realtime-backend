import type { PublicUser } from "./User.js"

export type Chat = {
  readonly id: string
  createdAt: Date,
  users: PublicUser[]
}