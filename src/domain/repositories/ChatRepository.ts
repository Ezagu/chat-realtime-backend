import type { Chat } from "../entities/Chat.js"

export interface ChatRepository {
  create: ({ identityId, friendId }: { identityId: string, friendId: string }) => void
  findByUser: (userId: string) => Promise<Chat[]>
  findById: (chatId: string) => Promise<Chat | null>
  readAllMessages: ({ chatId, identityId }: {chatId: string, identityId: string}) => void
  findByMembers: ({ identityId, friendId }: { identityId: string, friendId: string }) => Promise<Chat | null>
}