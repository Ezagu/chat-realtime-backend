import type { UserLogin } from "../entities/User.js";
import type { UserRepository } from "../repositories/UserRepository.js";

export class LoginUser {
  constructor(private userRepo: UserRepository){}

  execute = async(user: UserLogin) => {
    //TODO: Validacion de datos

    //Loguear usuario
    const userLogued = await this.userRepo.login(user);

    return userLogued
  }
}