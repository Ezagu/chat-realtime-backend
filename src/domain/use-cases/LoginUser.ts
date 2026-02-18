import type { UserLogin } from "../entities/User.js";
import { UserAlreadyExistsError } from "../errors/UserAlreadyExistsError.js";
import type { UserRepository } from "../repositories/UserRepository.js";

export class LoginUser {
  constructor(private userRepo: UserRepository){}

  execute = async(user: UserLogin) => {
    // Validar que exista el usuario
    const userExists = await this.userRepo.findByUsername({ username: user.username })
    if(!userExists) throw new UserAlreadyExistsError(user.username)

    //TODO: Validacion de datos

    //Loguear usuario
    const userLogued = await this.userRepo.login(user);

    return userLogued
  }
}