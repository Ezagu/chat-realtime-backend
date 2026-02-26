import type { Server } from "socket.io";
import type { TokenService } from "../../domain/services/TokenService.js";
import { createSocketAuthMiddleware } from "./middlewares/authentication.js";
import type { SocketData } from "../types/socket.js";
import { messageEventHandler } from "./events/message.events.js";
import { typingEventHandler } from "./events/typing.events.js";
import { readEventHandler } from "./events/read.events.js";
import { presenceEventHandler } from "./events/presence.events.js";

export const setupSocket = async ({ 
  io, 
  tokenService 
}: { 
  io: Server<any, any, any, SocketData>, 
  tokenService: TokenService 
}) => {
  // Autenticación
  io.use(createSocketAuthMiddleware(tokenService))

  io.on('connection', socket => {
    const {id, username} = socket.data.user
    console.log(`User: ${username} conectado`)
    socket.join(`user:${id}`)

    // CONEXION A LA ROOM PERSONAL
    io.to(`user:${id}`).emit('room', {message: `CONECTADO A LA ROOM user:${id}`})

    presenceEventHandler(io, socket)
    messageEventHandler(io, socket)
    typingEventHandler(io, socket)
    readEventHandler(io, socket)
    
  })
}