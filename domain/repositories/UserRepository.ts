import type { PublicUser, UserCreate, UserLogin } from "../entities/User.js";

export interface UserRepository {
  create: (user: UserCreate) => Promise<PublicUser>
  login: (input: UserLogin) => Promise<PublicUser>
  find: ({ search }: { search?: string }) => Promise<PublicUser[]>
}