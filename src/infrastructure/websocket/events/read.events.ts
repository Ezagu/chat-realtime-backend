import { ChatNotFoundError } from "../../../domain/errors/ChatNotFoundError.js";
import { ForbiddenChatAccessError } from "../../../domain/errors/ForbiddenChatAccessError.js";
import { UserNotFoundError } from "../../../domain/errors/UserNotFoundError.js";
import type { ReadChatMessages } from "../../../domain/use-cases/ReadChatMessages.usecase.js";
import type { SocketEventHandler } from "../../types/socket.js";

export const createReadEventHandler = (readChatMessages: ReadChatMessages): SocketEventHandler => {
  return (io, socket) => {
    socket.on('chat:read', async (chatId, callback) => {
      // LEER CHATS
      try {
        const { participants } = await readChatMessages.execute({chatId, identityId: socket.data.user.id})

        // EMITIR A USUARIO DEL CHAT QUE SUS MENSAJES FUERON VISTOS
        participants.forEach(user => {
          if(user.id !== socket.data.user.id) {
            io.to(`user:${user.id}`).emit('chat:read', {chatId})
          }
        })

        return callback({success: true})
      } catch (error) {
        if(error instanceof ChatNotFoundError) {
          return callback({error: error.message})
        }
        if(error instanceof UserNotFoundError) {
          return callback({error: error.message})
        }
        if(error instanceof ForbiddenChatAccessError) {
          return callback({error: error.message})
        }
        return callback({error: 'Internal Server Error'})
      }
    })
  }
}