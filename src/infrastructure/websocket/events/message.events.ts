import type { SocketEventHandler } from "../../types/socket.js";
import { validateMessageSend } from "../schemas/message.js";
import type { CreateMessage } from "../../../domain/use-cases/CreateMessage.usecase.js";
import { ChatNotFoundError } from "../../../domain/errors/ChatNotFoundError.js";
import { UserNotFoundError } from "../../../domain/errors/UserNotFoundError.js";
import { ForbiddenChatAccessError } from "../../../domain/errors/ForbiddenChatAccessError.js";

export const createMessageEventHandler = (createMessage: CreateMessage): SocketEventHandler => {
  return (io, socket) => {
    socket.on('message:send', async (dto, callback) => {
      // Si no se envia callback para ack, entonces ejecuta funcion
      // vacía para que no de errores
      const ack = typeof callback === 'function' ? callback : () => {}
      // VALIDAR DATOS
      const validation = validateMessageSend(dto)
      if(validation.error) return ack({ error: 'Invalid Data' })

      // GUARDAR EN BASE DE DATOS
      try {
        const result = await createMessage.execute({...validation.data, userId: socket.data.user.id})

        // EMITIR MENSAJE NUEVO A CADA PARTICIPANTE EN SU ROOM
        result.participants.forEach(user => {
          io.to(`user:${user.id}`).emit('message:new', result.message)
        })

        return ack({ success: true })
      } catch (error) {
        if(error instanceof ChatNotFoundError) return ack({error: error.message})
        if(error instanceof UserNotFoundError) return ack({error: error.message})
        if(error instanceof ForbiddenChatAccessError) return ack({error: error.message})
        return ack({error: 'Internal Server Error'})
      }
    })
  } 
}