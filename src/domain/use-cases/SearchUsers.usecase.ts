import type { UserRepository } from "../repositories/UserRepository.js"

export class SearchUsers{
  constructor(private userRepo: UserRepository){}

  execute = async({ search } : {search: string}) => {
    const users = await this.userRepo.search({search})
    return users
  }
}