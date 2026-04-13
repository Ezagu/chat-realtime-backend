import type { UserId } from "./User.js"

export type Message = {
  readonly id: string
  createdAt: Date
  content: string
  chatId: string
  userId: UserId
  read: boolean
} 

export type SendMessagePayload = {
  text: string,
  toUserId: string
}

export type SendMessageInput = {
  text: string,
  toUserId: string,
  fromUserId: string
}

export type CreateMessageData = {
  text: string,
  fromUserId: string,
  chatId: string
}