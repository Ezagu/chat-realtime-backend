import express, { Router } from "express"
import type { ChatController } from "../controllers/chat.js"

export const chatRouter = (
  chatController: ChatController,
  auth: express.RequestHandler
) => {
  const router = Router()
  
  router.get('/', auth)
  router.get('/:id/messages', auth)
  
  return router
}
