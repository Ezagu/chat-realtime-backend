import { UserNotFoundError } from "../errors/UserNotFoundError.js";
import type { ChatRepository } from "../repositories/ChatRepository.js";
import type { UserRepository } from "../repositories/UserRepository.js";

export class GetMyChats {
  constructor(private userRepo: UserRepository, private chatRepo: ChatRepository){}

  execute = async({ identityId }: { identityId: string }) => {
    // Validar que exista el usuario
    const user = await this.userRepo.findById(identityId)
    if(!user) throw new UserNotFoundError()

    return await this.chatRepo.findByUser(identityId)
  }
}