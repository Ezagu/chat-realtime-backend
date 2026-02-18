import type { ChatRespository } from "../repositories/ChatRepository.js";
import type { MessageRepository } from "../repositories/MessageRepository.js";
import type { UserRepository } from "../repositories/UserRepository.js";

export class ReadChatMessages {
  constructor(private chatRepo: ChatRespository, private messageRepo: MessageRepository, private userRepo: UserRepository){}

  execute = async({ chatId, identityId }: { chatId: string, identityId: string }) => {
    // Validar que exista el chat
    const chat = await this.chatRepo.findById({ chatId })
    if(!chat) throw new Error('Chat no encontrado')

    // Validar que exista el usuario
    const user = await this.userRepo.findById({ userId: identityId })
    if(!user) throw new Error('Usuario no encontrado')

    // Validar que el usuario pertenezca al chat
    if(!chat.members.includes(identityId)) throw new Error('Usuario no pertenece al chat')

    this.chatRepo.readAllMessages({ chatId, identityId })
  }
}