import type { ChatRespository } from "../repositories/ChatRepository.js";
import type { UserRepository } from "../repositories/UserRepository.js";

export class CreateChat {
  constructor(private chatRepo: ChatRespository, private userRepo: UserRepository){}

  execute = async({ identityId, friendId }: { identityId: string, friendId: string }) => {
    // Validar que los usuarios existan
    const identity = await this.userRepo.findById({ userId: identityId })
    if(!identity) throw new Error('Usuario no encontrado')

    const friend = await this.userRepo.findById({ userId: friendId })
    if(!friend) throw new Error('Usuario no encontrado')

    // Validar que no exista un chat entre los mismos usuarios
    const chatExists = await this.chatRepo.findByMembers({ identityId, friendId })
    if(chatExists) throw new Error('Chat ya creado')

    // Crear chat
    this.chatRepo.create({ identityId, friendId })
  }
}