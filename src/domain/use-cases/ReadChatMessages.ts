import { ChatNotFoundError } from "../errors/ChatNotFoundError.js";
import { ForbiddenChatAccessError } from "../errors/ForbiddenChatAccessError.js";
import { UserNotFoundError } from "../errors/UserNotFoundError.js";
import type { ChatRepository } from "../repositories/ChatRepository.js";
import type { MessageRepository } from "../repositories/MessageRepository.js";
import type { UserRepository } from "../repositories/UserRepository.js";

export class ReadChatMessages {
  constructor(private chatRepo: ChatRepository, private messageRepo: MessageRepository, private userRepo: UserRepository){}

  execute = async({ chatId, identityId }: { chatId: string, identityId: string }) => {
    // Validar que exista el chat
    const chat = await this.chatRepo.findById({ chatId })
    if(!chat) throw new ChatNotFoundError()

    // Validar que exista el usuario
    const user = await this.userRepo.findById({ userId: identityId })
    if(!user) throw new UserNotFoundError()

    // Validar que el usuario pertenezca al chat
    if(!chat.members.includes(identityId)) throw new ForbiddenChatAccessError()

    this.chatRepo.readAllMessages({ chatId, identityId })
  }
}