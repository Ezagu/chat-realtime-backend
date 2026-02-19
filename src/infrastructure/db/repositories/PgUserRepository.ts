import type { PublicUser, UserCreate, UserLogin } from "../../../domain/entities/User.js";
import type { UserRepository } from "../../../domain/repositories/UserRepository.js";

export class PgUserRepository implements UserRepository {
  create = async(user: UserCreate) => {
    console.log("USUARIO REGISTRADO EN LA BASE DE DATOS")
    return {id: "123", username: user.username, createdAt: 124}
  }

  login = async(input: UserLogin) => {
    console.log("USUARIO LOGUEADO EN LA BASE DE DATOS")
    return {id: "123", username: "ezagu", createdAt: 124}
  }

  find = async ({ search }: { search?: string }) => {
    console.log("USUARIOS BUSCADOS EN LA BASE DE DATOS")
    return []
  }
  findByUsername = async({ username }: { username: string }) => {
    console.log("USUARIO BUSCADO EN LA BASE DE DATOS")
  }

  findById = async({ userId }: { userId: string }) => {
    console.log("USUARIO BUSCADO EN LA BASE DE DATOS")

  }
}