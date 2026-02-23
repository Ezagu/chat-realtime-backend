import type { UserRepository } from "../repositories/UserRepository.js"

export class GetUsers{
  constructor(private userRepo: UserRepository){}

  execute = async() => {
    const users = await this.userRepo.find()
    return users
  }
}