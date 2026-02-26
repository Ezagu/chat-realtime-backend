import type { SocketEventHandler } from "../../types/socket.js";
import { addOnlineUser, getOnlineUsers, removeOnlineUser } from "../store/presence.store.js";

export const createPresenceEventHandler = (): SocketEventHandler => {
  return (io, socket) => {
    const {id, username} = socket.data.user
    addOnlineUser(id)

    // Envia usuarios en linea
    io.to(`user:${id}`).emit('presence:initial', getOnlineUsers())

    // Emite a los demas que esta en linea
    io.emit('user:online', { id, username })
    
    // Emite a los demas que esta offline
    socket.on('disconnect', () => {
      console.log(`Usuario ${username} desconectado`)
      removeOnlineUser(id)
      io.emit('user:offline', { id, username })
    })
  }
}
