import type { PublicUser, UserCreate } from "../entities/User.js";
import { UserAlreadyExistsError } from "../errors/UserAlreadyExistsError.js";
import type { UserRepository } from "../repositories/UserRepository.js";
import type { PasswordHasher } from "../services/PasswordHasher.js";
import type { TokenService } from "../services/TokenService.js";

type RegisterUserResponse = {
  user: PublicUser
  accessToken: string
}

export class RegisterUser{
  constructor(
    private readonly userRepo: UserRepository, 
    private readonly passwordHasher: PasswordHasher,
    private readonly tokenService: TokenService
  ){}

  execute = async(user: UserCreate): Promise<RegisterUserResponse> => {
    // Validar que no exista usuario
    const userExists = await this.userRepo.findByUsername(user.username)
    if(userExists) throw new UserAlreadyExistsError(user.username)

    // HASHEO DE CONTRASEÑA
    let passwordHashed
    try {
      passwordHashed = await this.passwordHasher.hash(user.password)
    } catch (error) {
      throw new Error("Internal Server Error")
    }

    // CREAR USUARIO
    const userCreated = await this.userRepo.create({username: user.username, password: passwordHashed});

    // LOGUEAR USUARIO
    //Crear token
    const accessToken = await this.tokenService.generate({
      id: userCreated.id,
      username: userCreated.username,
      createdAt: userCreated.createdAt
    })

    // Usuario Publico
    return {
      user: {
        id: userCreated.id,
        username: userCreated.username,
        createdAt: userCreated.createdAt
      },
      accessToken
    }
  }
}