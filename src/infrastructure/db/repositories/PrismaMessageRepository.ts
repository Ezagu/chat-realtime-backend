import type { CreateMessageData } from "../../../domain/entities/Message.js";
import type { MessageRepository } from "../../../domain/repositories/MessageRepository.js";
import { prisma } from "../prisma/prisma.js";

export class PrismaMessageRepository implements MessageRepository {
  create = async (message: CreateMessageData) => {
    return await prisma.message.create({
      data: {
        content: message.text,
        userId: message.fromUserId,
        chatId: message.chatId
      }
    })
  };

  findByChat = async (chatId: string) => {
    return await prisma.message.findMany({
      where: {chatId},
      orderBy: {
        createdAt: 'desc'
      }
    })
  };
}