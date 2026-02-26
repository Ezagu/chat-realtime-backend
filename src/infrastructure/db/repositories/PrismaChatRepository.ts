import type { ChatRepository } from "../../../domain/repositories/ChatRepository.js";
import { prisma } from "../prisma/prisma.js";


export class PrismaChatRepository implements ChatRepository {

  create = async ({ identityId, friendId }: { identityId: string, friendId: string }) => {
    return await prisma.chat.create({
      data: {users: {
        connect: [
          {id: identityId},
          {id: friendId}
        ]
      }}
    })
  }

  findByUser = async (userId: string) => {
    return await prisma.chat.findMany({
      where: { users: { some: { id: userId }}},
      include: { users: {
        select: {
          username: true,
          id: true,
          createdAt: true
        }
      }}
    })
  }

  findById = async(chatId: string) => {
    return await prisma.chat.findUnique({
      where: { id: chatId },
      include: {users: {
        select: {
          username: true,
          id: true,
          createdAt: true
        }
      }}
    })
  };

  readAllMessages = async ({ chatId, identityId }: { chatId: string; identityId: string; }) => {
    await prisma.message.updateMany({
      where: {chatId, userId: identityId, read: false},
      data: { read: true }
    })
  }

  findByMembers = async ({ identityId, friendId }: { identityId: string; friendId: string; }) => {
    return prisma.chat.findFirst({
      where: { users: {every: {id: {in: [identityId, friendId] }}}},
      include: { users: { select: {
        username: true,
        id: true,
        createdAt: true
      }}}
    })
  };
}
