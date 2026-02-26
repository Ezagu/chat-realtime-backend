import type { Server } from "socket.io";
import type { TokenService } from "../../domain/services/TokenService.js";
import { createSocketAuthMiddleware } from "./middlewares/authentication.js";
import type { SocketData, SocketEventHandler } from "../types/socket.js";
import { typingEventHandler } from "./events/typing.events.js";
import { readEventHandler } from "./events/read.events.js";
import type { ClientToServerEvents, ServerToClientEvents } from "./types/events.js";

export const setupSocket = async ({ 
  io, 
  tokenService,
  messageEventHandler,
  presenceEventHandler
}: { 
  io: Server<ClientToServerEvents, ServerToClientEvents, {}, SocketData>, 
  tokenService: TokenService,
  messageEventHandler: SocketEventHandler,
  presenceEventHandler: SocketEventHandler
}) => {
  // Autenticación
  io.use(createSocketAuthMiddleware(tokenService))

  io.on('connection', socket => {
    const {id, username} = socket.data.user
    console.log(`User: ${username} conectado`)

    // CONEXION A LA ROOM PERSONAL
    socket.join(`user:${id}`)

    messageEventHandler(io, socket)
    presenceEventHandler(io, socket)
    typingEventHandler(io, socket)
    readEventHandler(io, socket)
  })
}