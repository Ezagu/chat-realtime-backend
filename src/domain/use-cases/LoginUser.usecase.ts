import bcrypt from "bcrypt"
import type { User, UserLogin } from "../entities/User.js"
import type { UserRepository } from "../repositories/UserRepository.js"
import { InvalidPasswordError } from "../errors/InvalidPasswordError.js"
import { UserNotFoundError } from "../errors/UserNotFoundError.js"

export class LoginUser{
  constructor(private userRepo: UserRepository){}

  execute = async(user: UserLogin) => {
      // Validar que exista el usuario
      const userExists: User = await this.userRepo.findByUsername({ username: user.username })
      if(!userExists) throw new UserNotFoundError()
  
      // Comparar contraseñas
      const comparation = await bcrypt.compare(user.password, userExists.password)
      if(!comparation) throw new InvalidPasswordError()
  
      //Loguear usuario
      return await this.userRepo.login(user);
    }
}