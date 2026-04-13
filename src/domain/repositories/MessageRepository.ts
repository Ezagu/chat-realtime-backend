import type { CreateMessageData, Message } from "../entities/Message.js";

export interface MessageRepository {
  create: (message: CreateMessageData) => Promise<Message>
  findByChat: (chatId: string) => Promise<Message[]>
}