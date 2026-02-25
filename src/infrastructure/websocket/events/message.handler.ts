import type { Server, Socket } from "socket.io";

export const messageHandler = (io: Server, socket: Socket) => {
  socket.on('new-message', (data) => {
    io.emit('new-message', 'chau world!')
  })
}