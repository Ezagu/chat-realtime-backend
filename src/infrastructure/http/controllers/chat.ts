import type { Request, Response } from "express"
import type { GetMyChats } from "../../../domain/use-cases/GetMyChats.usecase.js";
import type { GetChatMessages } from "../../../domain/use-cases/GetChatMessages.usecase.js";
import { UserNotFoundError } from "../../../domain/errors/UserNotFoundError.js";
import { ChatNotFoundError } from "../../../domain/errors/ChatNotFoundError.js";

export class ChatController {
  constructor(
    private readonly getMyChats: GetMyChats,
    private readonly getChatMessages: GetChatMessages
  ){}

  findMyChats = async (req: Request, res: Response) => {
    try {
      const chats = await this.getMyChats.execute(req.user.id)
      return res.json(chats)
    } catch (error) {
      if(error instanceof UserNotFoundError) {
        return res.status(400).send(error.message)
      }
      res.status(500).send('Internal Server Error')
    }
  }

  findMessages = async (req: Request, res: Response) => {
    const chatId = req.params.id
    if(!chatId || typeof chatId !== 'string') {
      return res.status(400).send('Enviar un chatId válido')
    }
    try {
      const messages = await this.getChatMessages.execute(chatId)
      return res.json(messages)
    } catch (error) {
      if(error instanceof ChatNotFoundError) {
        return res.status(400).send(error.message)
      }
      return res.status(500).send('Internal Server Error')
    }
  }
}