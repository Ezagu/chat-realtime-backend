import express from "express"
import { setupRoutes } from "./infrastructure/http/setup.js"
import { UserController } from "./infrastructure/http/controllers/user.js";
import { RegisterUser } from "./domain/use-cases/RegisterUser.usecase.js";
import { PgUserRepository } from "./infrastructure/db/repositories/PgUserRepository.js";
import { LoginUser } from "./domain/use-cases/LoginUser.usecase.js";
import { GetUsers } from "./domain/use-cases/GetUsers.usecase.js";
import { SearchUsers } from "./domain/use-cases/SearchUsers.usecase.js";
import { BcryptPasswordHasher } from "./utils/BcryptPasswordHasher.js";

const app = express()
const PORT = 3900;

app.use(express.json())

const userRepo = new PgUserRepository()
const passwordHasher = new BcryptPasswordHasher()

const registerUser = new RegisterUser(userRepo, passwordHasher);
const loginUser = new LoginUser(userRepo, passwordHasher)
const getUsers = new GetUsers(userRepo)
const searchUsers = new SearchUsers(userRepo)

const userController = new UserController(registerUser, loginUser, getUsers, searchUsers);

setupRoutes({ app, userController });

app.listen(3900, () => {
  console.log(`Server listening on port: http://localhost:${PORT}`)
})
