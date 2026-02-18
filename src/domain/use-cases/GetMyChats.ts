import type { ChatRespository } from "../repositories/ChatRepository.js";
import type { UserRepository } from "../repositories/UserRepository.js";

export class GetMyChats {
  constructor(private userRepo: UserRepository, private chatRepo: ChatRespository){}

  execute = async({ identityId }: { identityId: string }) => {
    // Validar que exista el usuario
    const user = await this.userRepo.findById({ userId: identityId })
    if(!user) throw new Error('Usuario no encontrado')

    return await this.chatRepo.findByUser({ userId: identityId })
  }
}