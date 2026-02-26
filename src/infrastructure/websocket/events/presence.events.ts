import type { Server, Socket } from "socket.io";
import type { SocketData } from "../../types/socket.js";

export const presenceEventHandler = (io: Server, socket: Socket<any, any, any, SocketData>) => {
  const {id, username} = socket.data.user
  
  io.emit('user:online', { id, username })
  
  socket.on('disconnect', () => {
    io.emit('user:offline', { id, username })
  })
}