import { Router } from "express"
import type { UserController } from "../controllers/user.js"

export const userRouter = (userControler: UserController) => {
  const router = Router()

  router.post('/register', userControler.register)
  
  return router
}


