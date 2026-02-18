import type { UserCreate } from "../entities/User.js";
import type { UserRepository } from "../repositories/UserRepository.js";

export class RegisterUser {
  constructor(private userRepo: UserRepository){}

  execute = async(user: UserCreate) => {
    // TODO: VALIDACIÓN DE DATOS

    // TODO: HASHEO DE CONTRASEÑA

    // CREAR USUARIO
    const userCreated = this.userRepo.create(user);

    return userCreated
  }
}