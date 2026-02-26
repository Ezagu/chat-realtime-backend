import type { Server, Socket } from "socket.io";
import type { SocketData } from "../../types/socket.js";

export const typingEventHandler = (io: Server, socket: Socket<any, any, any, SocketData>) => {
  socket.on('chat:typing', (chatId: string) => {
    // COMPROBAR QUE CHAT EXISTA

    // EMITIR TIPEO A LOS USUARIOS DEL CHAT QUE NO SEA EL USUARIO QUE ESTA TIPEANDO
  })

  socket.on('chat:stop-typing', (chatId: string) => {
    // COMPROBAR QUE CHAT EXISTA

    // EMITIR A TODOS QUE EL USUARIO SOCKET DEJO DE TIPEAR
  })
}