import type { Socket } from "socket.io";
import type { UserId } from "../../domain/entities/User.js";
import type { ClientToServerEvents, ServerToClientEvents } from "../websocket/types/events.js";

export interface SocketData {
  user: {
    id: UserId,
    username: string
  }
}

export type SocketEventHandler = (
  io: Server<ClientToServerEvents, ServerToClientEvents, {}, SocketData>,
  socket: Socket<ClientToServerEvents, ServerToClientEvents, {}, SocketData>
) => void