import type { UserCreate } from "../entities/User.js";
import { UserAlreadyExistsError } from "../errors/UserAlreadyExistsError.js";
import type { UserRepository } from "../repositories/UserRepository.js";

export class RegisterUser {
  constructor(private userRepo: UserRepository){}

  execute = async(user: UserCreate) => {
    // Validar que no exista usuario
    const userExists = await this.userRepo.findByUsername({username: user.username})
    if(userExists) throw new UserAlreadyExistsError(user.username)

    // TODO: VALIDACIÓN DE DATOS

    // TODO: HASHEO DE CONTRASEÑA

    // CREAR USUARIO
    const userCreated = await this.userRepo.create(user);

    return userCreated
  }
}