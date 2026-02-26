import type { UserId } from "./User.js"

export type SendMessageDto = {
  content: string
  chatId: string
}

export type CreateMessageInput = {
  userId: UserId
  content: string
  chatId: string
}

export type Message = {
  readonly id: string
  createdAt: Date
  content: string
  chatId: string
  userId: UserId
  read: boolean
} 