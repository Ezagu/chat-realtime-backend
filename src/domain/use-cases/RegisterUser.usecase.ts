import type { UserCreate } from "../entities/User.js";
import { UserAlreadyExistsError } from "../errors/UserAlreadyExistsError.js";
import type { UserRepository } from "../repositories/UserRepository.js";
import type { PasswordHasher } from "../services/PasswordHasher.js";

export class RegisterUser{
  constructor(
    private readonly userRepo: UserRepository, 
    private readonly passwordHasher: PasswordHasher
  ){}

  execute = async(user: UserCreate) => {
    // Validar que no exista usuario
    const userExists = await this.userRepo.findByUsername({username: user.username})
    if(userExists) throw new UserAlreadyExistsError(user.username)

    // HASHEO DE CONTRASEÑA
    let passwordHashed
    try {
      passwordHashed = await this.passwordHasher.hash(user.password)
    } catch (error) {
      return null
    }

    // CREAR USUARIO
    const userCreated = await this.userRepo.create({username: user.username, password: passwordHashed});

    return userCreated
  }
}