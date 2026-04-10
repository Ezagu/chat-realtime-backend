import type { CreateMessageInput } from "../../../domain/entities/Message.js";
import type { MessageRepository } from "../../../domain/repositories/MessageRepository.js";
import { prisma } from "../prisma/prisma.js";

export class PrismaMessageRepository implements MessageRepository {
  create = async (message: CreateMessageInput) => {
    return await prisma.message.create({
      data: message
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