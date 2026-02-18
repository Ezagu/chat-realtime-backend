import { ChatAlreadyExistsError } from "../errors/ChatAlreadyExistsError.js";
import { UserNotFoundError } from "../errors/UserNotFoundError.js";
import type { ChatRespository } from "../repositories/ChatRepository.js";
import type { UserRepository } from "../repositories/UserRepository.js";

export class CreateChat {
  constructor(private chatRepo: ChatRespository, private userRepo: UserRepository){}

  execute = async({ identityId, friendId }: { identityId: string, friendId: string }) => {
    // Validar que los usuarios existan
    const identity = await this.userRepo.findById({ userId: identityId })
    if(!identity) throw new UserNotFoundError()

    const friend = await this.userRepo.findById({ userId: friendId })
    if(!friend) throw new UserNotFoundError()

    // Validar que no exista un chat entre los mismos usuarios
    const chatExists = await this.chatRepo.findByMembers({ identityId, friendId })
    if(chatExists) throw new ChatAlreadyExistsError()

    // Crear chat
    this.chatRepo.create({ identityId, friendId })
  }
}