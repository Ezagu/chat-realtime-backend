import type { PublicUser, User, UserCreate, UserLogin } from "../entities/User.js";

export interface UserRepository {
  create: (user: UserCreate) => Promise<User>
  login: (input: UserLogin) => Promise<{accessToken: string, user: PublicUser}>
  find: () => Promise<User[] | []>
  search: ({ search }: { search?: string }) => Promise<User[] | []>
  findByUsername: ({ username }: { username: string }) => Promise<User | void>
  findById: ({ userId }: { userId: string }) => Promise<User | void>
}