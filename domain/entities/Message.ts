export type CreateMessage = {
  content: string
  chatId: string
  userId: string
}

export type Message = {
  readonly id: string
  createdAt: number
  content: string
  chatId: string
  userId: string
} 