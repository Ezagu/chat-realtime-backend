import { Router } from "express"

export const userRouter = () => {
  const router = Router()

  router.get("/ping", (req, res) => {
    res.send('pong')
  })
  
  return router
}


