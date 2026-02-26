import type { Message, SendMessageDto } from "../../domain/entities/Message.js";

export interface ClientToServerEvents {
  "message:send": (
    dto: SendMessageDto,
    callback: (response: {success: boolean} | {error: string}) => void
  ) => void
  "chat:read": (
    chatId: string,
    callback: (response: {success: boolean} | {error: string}) => void
  ) => void
}

export interface ServerToClientEvents {
  "message:new": (message: Message) => void
}