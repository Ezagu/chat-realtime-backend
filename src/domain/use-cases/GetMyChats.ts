import { UserNotFoundError } from "../errors/UserNotFoundError.js";
import type { ChatRespository } from "../repositories/ChatRepository.js";
import type { UserRepository } from "../repositories/UserRepository.js";

export class GetMyChats {
  constructor(private userRepo: UserRepository, private chatRepo: ChatRespository){}

  execute = async({ identityId }: { identityId: string }) => {
    // Validar que exista el usuario
    const user = await this.userRepo.findById({ userId: identityId })
    if(!user) throw new UserNotFoundError()

    return await this.chatRepo.findByUser({ userId: identityId })
  }
}