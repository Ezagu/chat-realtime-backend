import type { CreateMessageInput, SendMessagePayload } from "../../../domain/entities/Message.js";
import type { Message, SendMessageDto } from "../../domain/entities/Message.js";

export interface ClientToServerEvents {
  "message:send": (
    dto: SendMessagePayload,
    callback: (response: {success: boolean} | {error: string}) => void
  ) => void
  "chat:read": (
    chatId: string,
    callback: (response: {success: boolean} | {error: string}) => void
  ) => void
  "presence:get_initial": () => void
}

export interface ServerToClientEvents {
  "message:new": (message: Message) => void
  "presence:initial": (users: string[]) => void
  "user:online": (id: string) => string
  "user:offline": (id: string) => string
}