import express, { Router } from "express"
import type { UserController } from "../controllers/user.js"

export const userRouter = (userController: UserController, auth: express.RequestHandler) => {
  const router = Router()

  router.post('/register', userController.register)
  router.post('/login', userController.login)
  router.post('/logout', userController.logout)

  router.get('/', auth, userController.find)


  return router
}


