import type { UserCreate } from "../entities/User.js";
import { UserAlreadyExistsError } from "../errors/UserAlreadyExistsError.js";
import type { UserRepository } from "../repositories/UserRepository.js";
import bcrypt from "bcrypt"

export class RegisterUser {
  constructor(private userRepo: UserRepository){}

  execute = async(user: UserCreate) => {
    // Validar que no exista usuario
    const userExists = await this.userRepo.findByUsername({username: user.username})
    if(userExists) throw new UserAlreadyExistsError(user.username)

    // TODO: HASHEO DE CONTRASEÑA
    let passwordHashed
    try {
      passwordHashed = await bcrypt.hash(user.password, 10)
    } catch (error) {
      return null
    }

    // CREAR USUARIO
    const userCreated = await this.userRepo.create({username: user.username, password: passwordHashed});

    return userCreated
  }
}