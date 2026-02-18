import type { CreateMessage, Message } from "../entities/Message.js";

export interface MessageRepository {
  create: (message: CreateMessage) => Promise<Message>
  findByChat: ({ chatId }: { chatId: string }) => Promise<Message[]>
  readAll: ({ chatId, identityId }: {chatId: string, identityId: string}) => void
}