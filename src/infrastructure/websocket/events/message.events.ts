import type { SocketEventHandler } from "../../types/socket.js";
import { validateMessageSend } from "../schemas/message.js";
import type { CreateMessage } from "../../../domain/use-cases/CreateMessage.usecase.js";
import { ChatNotFoundError } from "../../../domain/errors/ChatNotFoundError.js";
import { UserNotFoundError } from "../../../domain/errors/UserNotFoundError.js";
import { ForbiddenChatAccessError } from "../../../domain/errors/ForbiddenChatAccessError.js";

export const createMessageEventHandler = (createMessage: CreateMessage): SocketEventHandler => {
  return (io, socket) => {
    socket.on('message:send', async (dto, callback) => {
      // VALIDAR DATOS
      const validation = validateMessageSend(dto)
      if(validation.error) return callback({ error: 'Invalid Data' })

      // GUARDAR EN BASE DE DATOS
      try {
        const result = await createMessage.execute({...validation.data, userId: socket.data.user.id})

        // EMITIR MENSAJE NUEVO A CADA PARTICIPANTE EN SU ROOM
        result.participants.forEach(user => {
          io.to(`user:${user.id}`).emit('message:new', result.message)
        })

        return callback({ success: true })
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