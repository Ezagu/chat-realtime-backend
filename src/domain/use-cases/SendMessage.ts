import type { CreateMessage } from "../entities/Message.js";
import type { ChatRespository } from "../repositories/ChatRepository.js";
import type { MessageRepository } from "../repositories/MessageRepository.js";
import type { UserRepository } from "../repositories/UserRepository.js";

export class SendMessage {
  constructor(private messageRepo: MessageRepository, private chatRepo: ChatRespository, private userRepo: UserRepository){}

  execute = async(message: CreateMessage) => {
    // Validar que exista el chat
    const chat = await this.chatRepo.findById({ chatId: message.chatId })
    if(!chat) throw new Error('Chat no encontrado')

    // Validar que exista el usuario
    const user = await this.userRepo.findById({ userId: message.userId })
    if(!user) throw new Error('Usuario no encontrado')

    // Validar que el usuario sea parte del chat
    if(!chat.members.includes(message.userId)) throw new Error('Usuario no pertenece al chat')

    // TODO: VALIDAR MENSAJE

    // Crear mensaje
    this.messageRepo.create(message)
  }
}