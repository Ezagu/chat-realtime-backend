import { Router } from "express"

export const chatRouter = () => {
  const router = Router()

  router.get("/ping", (req, res) => {
    res.send('pong')
  })
  
  return router
}
