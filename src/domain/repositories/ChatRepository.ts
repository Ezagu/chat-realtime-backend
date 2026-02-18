import type { Chat } from "../entities/Chat.js"

export interface ChatRespository {
  create: ({ identityId, friendId }: { identityId: string, friendId: string }) => void
  findByUser: ({ userId }: { userId: string }) => Promise<Chat[]>
  findById: ({ chatId }: { chatId: string }) => Promise<Chat>
  readAllMessages: ({ chatId, identityId }: {chatId: string, identityId: string}) => void
  findByMembers: ({ identityId, friendId }: { identityId: string, friendId: string }) => Promise<Chat>
}