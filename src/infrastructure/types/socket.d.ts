import type { UserId } from "../../domain/entities/User.js";

export interface SocketData {
  user: {
    id: UserId,
    username: string
  }
}

export type MessageSend = {
  content: string,
  toUser: UserId,
  fromUser: UserId
}