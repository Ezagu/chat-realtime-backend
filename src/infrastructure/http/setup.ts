import express from "express"
import { userRouter } from "./routes/user.js"
import { messageRouter } from "./routes/message.js"
import { chatRouter } from "./routes/chat.js"

export const setupRoutes = (app: express.Application) => {
  app.use('/users', userRouter())
  app.use('/chats', chatRouter())
  app.use('/messages', messageRouter())
} 