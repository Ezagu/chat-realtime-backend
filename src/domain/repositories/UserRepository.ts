import type { User, UserCreate } from "../entities/User.js";

export interface UserRepository {
  create: (user: UserCreate) => Promise<User>
  find: () => Promise<User[] | []>
  search: (search: string) => Promise<User[] | []>
  findByUsername: (username: string) => Promise<User | null>
  findById: (userId: string) => Promise<User | null>
}