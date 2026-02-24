
import type { UserCreate } from "../../../domain/entities/User.js";
import type { UserRepository } from "../../../domain/repositories/UserRepository.js";
import { prisma } from "../prisma/prisma.js";

export class PrismaUserRepository implements UserRepository {

  create = async (user: UserCreate) => {
    return await prisma.user.create({
      data: user
    })
  }

  find = async () => {
    return await prisma.user.findMany()
  }

  search = async (search: string) => {
    return await prisma.user.findMany({
      where: {
        username: {
          contains: search
        }
      }
    })
  }

  findByUsername = async (username: string) => {
    return await prisma.user.findFirst({
      where: {
        username: {
          equals: username
        }
      }
    })
  }

  findById = async (id: string) => {
    return await prisma.user.findFirst({
      where: {
        id: {
          equals: id
        }
      }
    })
  }
}