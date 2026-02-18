import type { UserRepository } from "../repositories/UserRepository.js";

export class SearchUser {
  constructor(private userRepo: UserRepository) {}

  execute = async({ search } : {search: string}) => {
    // VALIDAR SEARCH

    const users = await this.userRepo.find({search})

    return users
  }
}