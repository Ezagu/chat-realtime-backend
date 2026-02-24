import type { Request, Response } from "express"
import type { UserCreate, UserLogin } from "../../../domain/entities/User.js"
import type { RegisterUser } from "../../../domain/use-cases/RegisterUser.usecase.js"
import type { LoginUser } from "../../../domain/use-cases/LoginUser.usecase.js"
import type { GetUsers } from "../../../domain/use-cases/GetUsers.usecase.js"
import type { SearchUsers } from "../../../domain/use-cases/SearchUsers.usecase.js"
import { UserAlreadyExistsError } from "../../../domain/errors/UserAlreadyExistsError.js"
import { validateUser } from "../schemas/user.js"
import { InvalidPasswordError } from "../../../domain/errors/InvalidPasswordError.js"
import { UserNotFoundError } from "../../../domain/errors/UserNotFoundError.js"


export class UserController {
  constructor(
    private readonly registerUser: RegisterUser,
    private readonly loginUser: LoginUser,
    private readonly getUsers: GetUsers,
    private readonly searchUsers: SearchUsers
  ){}

  register = async (req: Request, res: Response) => {
    const user: UserCreate = req.body

    // Validar datos
    const validation = validateUser(user);
    if (validation.error) {
      return res.status(422).json({
        error: JSON.parse(validation.error.message)[0].message
      });
    }

    try {
      // Registrar usuario
      const userCreated = await this.registerUser.execute(validation.data)
      return res.status(201).json(userCreated)
    } catch (error) {
      if(error instanceof UserAlreadyExistsError) {
        return res.status(409).send(error.message)
      } else {
        return res.status(500).send('Internal Server Error')
      }
    }
  }

  login = async (req: Request, res: Response) => {
    const user: UserLogin = req.body

    // Validar datos
    const validation = validateUser(user);
    if (validation.error) {
      return res.status(422).json({
        error: JSON.parse(validation.error.message)[0].message
      });
    }

    try {
      const loginData = await this.loginUser.execute(validation.data)
      res.cookie('access-token', loginData.accessToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60
      }).json({
        user: loginData.user
      })
    } catch (error) {
      if(error instanceof UserNotFoundError || error instanceof InvalidPasswordError) {
        return res.status(400).send(error.message)
      } else {
        return res.status(500).send('Internal Server Error')
      }
    }
  }

  find = async (req: Request, res: Response) => {
    const search = req.query.search
    try {
      let users = []
      if(search && typeof search === 'string') {
        users = await this.searchUsers.execute(search)
      } else {
        users = await this.getUsers.execute()
      } 
      return res.json(users)
    } catch(error) {
      return res.status(500).send('Internal Server Error')
    }
  }
}