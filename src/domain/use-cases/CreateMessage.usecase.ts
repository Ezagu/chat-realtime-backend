import type { SendMessageInput } from "../entities/Message.js";
import { UserNotFoundError } from "../errors/UserNotFoundError.js";
import type { ChatRepository } from "../repositories/ChatRepository.js";
import type { MessageRepository } from "../repositories/MessageRepository.js";
import type { UserRepository } from "../repositories/UserRepository.js";

export class CreateMessage {
  constructor(private messageRepo: MessageRepository, private chatRepo: ChatRepository, private userRepo: UserRepository){}

  execute = async(message: SendMessageInput) => {
    // Validar que existan los usuarios
    const fromUser = await this.userRepo.findById(message.fromUserId)
    const toUser = await this.userRepo.findById(message.toUserId)

    if(!fromUser || !toUser) throw new UserNotFoundError()

    // Validar que exista el chat
    let chat = await this.chatRepo.findByMembers({identityId: message.fromUserId, friendId: message.toUserId})

    if(!chat) {
      // Si no existe el chat, crearlo
      chat = await this.chatRepo.create({identityId: message.fromUserId, friendId: message.toUserId})
    }

    if(!chat) throw new Error('Chat could not be created')

    // Crear mensaje
    const messageCreated = await this.messageRepo.create({
      text: message.text,
      fromUserId: message.fromUserId,
      chatId: chat.id
    })

    return {
      message: messageCreated,
      chat: {
        ...chat,
        messages: [messageCreated]
      }
    }
  }
}