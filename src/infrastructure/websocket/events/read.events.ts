import type { Server, Socket } from "socket.io";
import type { SocketData } from "../../types/socket.js";

export const readEventHandler = (io: Server, socket: Socket<any, any, any, SocketData>) => {
  socket.on('chat:read', (chatId: string) => {
    // VALIDAR QUE EL CHAT EXISTA

    // EMITIR A USUARIO DEL CHAT QUE SUS MENSAJES FUERON VISTOS
  })
}