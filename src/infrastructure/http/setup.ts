import express from "express"
import { userRouter } from "./routes/user.js"
import { chatRouter } from "./routes/chat.js"
import type { UserController } from "./controllers/user.js"
import type { ChatController } from "./controllers/chat.js"

export const setupRoutes = (
  { app, userController, auth, chatController } : 
  { app: express.Application, userController: UserController, auth: express.RequestHandler, chatController: ChatController }
) => {
  app.use('/users', userRouter(userController, auth))
  app.use('/chats', chatRouter(chatController, auth))
} 