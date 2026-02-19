import { Router } from "express"

export const messageRouter = () => {
  const router = Router()

  router.get("/ping", (req, res) => {
    res.send('pong')
  })
  
  return router
}
