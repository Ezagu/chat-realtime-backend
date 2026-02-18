import type { Chat } from "../entities/Chat.js"

export interface ChatRespository {
  create: ({ userId, friendId }: { userId: string, friendId: string }) => void
  findByUser: ({ userId }: { userId: string }) => Promise<Chat[]>
}