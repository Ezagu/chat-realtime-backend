import type { User, UserCreate } from "../entities/User.js";

export interface UserRepository {
  create: (user: UserCreate) => Promise<User>
  find: () => Promise<User[] | []>
  search: ({ search }: { search?: string }) => Promise<User[] | []>
  findByUsername: ({ username }: { username: string }) => Promise<User | void>
  findById: ({ userId }: { userId: string }) => Promise<User | void>
}