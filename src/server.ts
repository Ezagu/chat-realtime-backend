import express from "express"
import "dotenv/config"
import { setupRoutes } from "./infrastructure/http/setup.js"
import { UserController } from "./infrastructure/http/controllers/user.js";
import { RegisterUser } from "./domain/use-cases/RegisterUser.usecase.js";
import { LoginUser } from "./domain/use-cases/LoginUser.usecase.js";
import { GetUsers } from "./domain/use-cases/GetUsers.usecase.js";
import { SearchUsers } from "./domain/use-cases/SearchUsers.usecase.js";
import { BcryptPasswordHasher } from "./infrastructure/security/BcryptPasswordHasher.js";
import { JwtTokenService } from "./infrastructure/security/JwtTokenService.js";
import { PrismaUserRepository } from "./infrastructure/db/repositories/PrismaUserRepository.js";
import { authMiddleware } from "./infrastructure/http/middlewares/auth.js";
import cookieParser from "cookie-parser";
import { ChatController } from "./infrastructure/http/controllers/chat.js";
import { PrismaChatRepository } from "./infrastructure/db/repositories/PrismaChatRepository.js";
import { GetMyChats } from "./domain/use-cases/GetMyChats.usecase.js";
import { ReadChatMessages } from "./domain/use-cases/ReadChatMessages.usecase.js";
import { GetChatMessages } from "./domain/use-cases/GetChatMessages.usecase.js";

const app = express()
const PORT = 3900;

app.use(express.json())
app.use(cookieParser())

const userRepo = new PrismaUserRepository()
const chatRepo = new PrismaChatRepository()
const messageRepo = new 

const passwordHasher = new BcryptPasswordHasher()
const tokenService = new JwtTokenService(process.env.JWT_SECRET!)

const registerUser = new RegisterUser(userRepo, passwordHasher);
const loginUser = new LoginUser(userRepo, passwordHasher, tokenService)
const getUsers = new GetUsers(userRepo)
const searchUsers = new SearchUsers(userRepo)

const getMyChats = new GetMyChats(userRepo, chatRepo)
const getChatMessage = new GetChatMessages()

const userController = new UserController(registerUser, loginUser, getUsers, searchUsers);
const chatController = new ChatController()

const auth = authMiddleware(tokenService)
setupRoutes({ app, userController, auth, chatController});

app.listen(3900, () => {
  console.log(`Server listening on port: http://localhost:${PORT}`)
})
