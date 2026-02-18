import type { ChatRespository } from "../repositories/ChatRepository.js";
import type { MessageRepository } from "../repositories/MessageRepository.js";

export class GetChatMessages {
  constructor(private messageRepo: MessageRepository, private chatRepo: ChatRespository){}

  execute = async({ chatId }: { chatId: string }) => {
    // Validar que exista el chat
    const chat = await this.chatRepo.findById({ chatId })
    if(!chat) throw new Error('Chat no encontrado')

    // Buscar los mensajes
    return await this.messageRepo.findByChat({ chatId })
  }
}