import type { Request, Response } from "express"
import type { UserCreate } from "../../../domain/entities/User.js"
import type { RegisterUser } from "../../../domain/use-cases/RegisterUser.js"
import { UserAlreadyExistsError } from "../../../domain/errors/UserAlreadyExistsError.js"
import { validateUser } from "../schemas/user.js"

export class UserController {
  constructor(private registerUser: RegisterUser){}

  register = async (req: Request, res: Response) => {
    // Validar datos
    const user: UserCreate = req.body
    console.log(req.body);
    const validation = validateUser(user);
    if (validation.error) {
      return res.status(422).json({
        error: JSON.parse(validation.error.message)[0].message
      });
    }

    try {
      // Registrar usuario
      const userCreated = await this.registerUser.execute(user)
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
    
  }

  search = async (req: Request, res: Response) => {
    
  }

  findById = async (req: Request, res: Response) => {
    
  }
}