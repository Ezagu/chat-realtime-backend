import type { CreateMessage } from "../entities/Message.js";
import { ChatNotFoundError } from "../errors/ChatNotFoundError.js";
import { ForbiddenChatAccessError } from "../errors/ForbiddenChatAccessError.js";
import { UserNotFoundError } from "../errors/UserNotFoundError.js";
import type { ChatRepository } from "../repositories/ChatRepository.js";
import type { MessageRepository } from "../repositories/MessageRepository.js";
import type { UserRepository } from "../repositories/UserRepository.js";

export class SendMessage {
  constructor(private messageRepo: MessageRepository, private chatRepo: ChatRepository, private userRepo: UserRepository){}

  execute = async(message: CreateMessage) => {
    // Validar que exista el chat
    const chat = await this.chatRepo.findById(message.chatId)
    if(!chat) throw new ChatNotFoundError()

    // Validar que exista el usuario
    const user = await this.userRepo.findById(message.userId)
    if(!user) throw new UserNotFoundError()

    // Validar que el usuario sea parte del chat
    let belongsToChat = false
    chat.users.forEach(user => {
      if(user.id === message.userId) belongsToChat = true
    })
    if(!belongsToChat) throw new ForbiddenChatAccessError()

    // Crear mensaje
    this.messageRepo.create(message)
  }
}