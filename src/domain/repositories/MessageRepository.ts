import type { CreateMessage, Message } from "../entities/Message.js";

export interface MessageRepository {
  create: (message: CreateMessage) => Promise<Message>
  findByChat: (chatId: string) => Promise<Message[]>
}