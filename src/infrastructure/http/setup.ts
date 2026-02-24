import express from "express"
import { userRouter } from "./routes/user.js"
import { messageRouter } from "./routes/message.js"
import { chatRouter } from "./routes/chat.js"
import type { UserController } from "./controllers/user.js"

export const setupRoutes = (
  { app, userController } : 
  {app: express.Application, userController: UserController}
) => {
  app.use('/users', userRouter(userController))
  //app.use('/chats', chatRouter())
  //app.use('/messages', messageRouter())
} 