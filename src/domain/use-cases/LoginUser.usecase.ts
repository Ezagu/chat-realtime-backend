import type { User, UserLogin } from "../entities/User.js"
import type { UserRepository } from "../repositories/UserRepository.js"
import { InvalidPasswordError } from "../errors/InvalidPasswordError.js"
import { UserNotFoundError } from "../errors/UserNotFoundError.js"
import type { PasswordHasher } from "../services/PasswordHasher.js"
import type { TokenService } from "../services/TokenService.js"

export class LoginUser{
  constructor(
    private readonly userRepo: UserRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly tokenService: TokenService
  ){}

  execute = async(user: UserLogin) => {
      // Validar que exista el usuario
      const userExists = await this.userRepo.findByUsername(user.username)
      if(!userExists) throw new UserNotFoundError()
  
      // Comparar contraseñas
      const comparation = await this.passwordHasher.compare(user.password, userExists.password)
      if(!comparation) throw new InvalidPasswordError()

      //Crear token
      const accessToken = await this.tokenService.generate({
        id: userExists.id,
        username: userExists.username
      })

      // Hacer el PublicUser
      const {password, ...publicUser} = userExists

      //Devolver token y usuario
      return {
        accessToken,
        user: publicUser
      }
    }
}