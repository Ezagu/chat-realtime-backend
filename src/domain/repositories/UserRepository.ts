import type { PublicUser, UserCreate, UserLogin } from "../entities/User.js";

export interface UserRepository {
  create: (user: UserCreate) => Promise<PublicUser | void>
  login: (input: UserLogin) => Promise<PublicUser | void>
  find: ({ search }: { search?: string }) => Promise<PublicUser[] | []>
  findByUsername: ({ username }: { username: string }) => Promise<PublicUser | void>
  findById: ({ userId }: { userId: string }) => Promise<PublicUser | void>
}