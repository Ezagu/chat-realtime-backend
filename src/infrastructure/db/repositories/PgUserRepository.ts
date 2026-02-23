import type { PublicUser, User, UserCreate, UserLogin } from "../../../domain/entities/User.js";
import type { UserRepository } from "../../../domain/repositories/UserRepository.js";

export class PgUserRepository implements UserRepository {
  create = async(user: UserCreate) => {
    console.log("USUARIO REGISTRADO EN LA BASE DE DATOS")
    return {id: "123", username: user.username, createdAt: 124, password: 'asjdh12j3h'}
  }

  login = async(input: UserLogin) => {
    console.log("USUARIO LOGUEADO EN LA BASE DE DATOS")
    return {
      accessToken: "asdjk1j2313am,sd", 
      user: {
        id: '123',
        username: 'Ezagu',
        createdAt: 31231
      }}
  }

  find = async () => {
    console.log("USUARIOS BUSCADOS EN LA BASE DE DATOS")
    return []
  }

  search = async ({ search }: { search?: string }) => {
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