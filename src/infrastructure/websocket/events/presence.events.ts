import type { SocketEventHandler } from "../../types/socket.js";
import { addOnlineUser, getOnlineUsers, removeOnlineUser } from "../store/presence.store.js";

export const createPresenceEventHandler = (): SocketEventHandler => {
  return (io, socket) => {
    const {id, username} = socket.data.user
    addOnlineUser(id)

    // Cuando el usuario requiera los usuarios online, se los emite
    socket.on('presence:get_initial', () => {
      socket.emit('presence:initial', getOnlineUsers())
    })

    // Emite a los demas que esta en linea
    socket.broadcast.emit('user:online', id)
    
    // Emite a los demas que esta offline
    socket.on('disconnect', () => {
      console.log(`Usuario ${username} desconectado`)
      removeOnlineUser(id)
      io.emit('user:offline', id)
    })
  }
}
