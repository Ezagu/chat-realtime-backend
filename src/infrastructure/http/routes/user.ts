import { Router } from "express"
import type { UserController } from "../controllers/user.js"

export const userRouter = (userController: UserController) => {
  const router = Router()

  router.post('/register', userController.register)
  router.post('/login', userController.login)

  router.get('/', userController.find)

  return router
}


