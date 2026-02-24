export type CreateMessage = {
  content: string
  chatId: string
  userId: string
}

export type Message = {
  readonly id: string
  createdAt: Date
  content: string
  chatId: string
  userId: string
  read: boolean
} 