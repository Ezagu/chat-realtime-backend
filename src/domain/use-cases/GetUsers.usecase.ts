import type { PublicUser } from "../entities/User.js"
import type { UserRepository } from "../repositories/UserRepository.js"

export class GetUsers{
  constructor(private userRepo: UserRepository){}

  execute = async (): Promise<PublicUser[]> => {
    const users = await this.userRepo.find()
    return users.map(user => ({
      id: user.id,
      username: user.username,
      createdAt: user.createdAt
    }))
  }
}