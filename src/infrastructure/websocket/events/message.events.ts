import type { Server, Socket } from "socket.io";
import type { MessageSend, SocketData } from "../../types/socket.js";

export const messageEventHandler = (io: Server, socket: Socket<any, any, any, SocketData>) => {
  socket.on('message:send', (message: MessageSend) => {
    console.log(`Mensaje de ${socket.data.user.username} recibido: ${message.content}, para ${message.toUser}`)
    // VALIDAR DATOS

    // GUARDAR EN BASE DE DATOS

    // NOTIFICAR A LOS DOS USUARIOS QUE HAY UN MENSAJE NUEVO
  })
}