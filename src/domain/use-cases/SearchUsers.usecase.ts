import type { PublicUser } from "../entities/User.js"
import type { UserRepository } from "../repositories/UserRepository.js"

export class SearchUsers{
  constructor(private userRepo: UserRepository){}

  execute = async(search: string): Promise<PublicUser[]> => {
    const users = await this.userRepo.search(search)
    return users.map(user => ({
      id: user.id,
      username: user.username,
      createdAt: user.createdAt
    }))
  }
}