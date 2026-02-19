import express from "express"
import { setupRoutes } from "./infrastructure/http/setup.js"
import { UserController } from "./infrastructure/http/controllers/user.js";
import { RegisterUser } from "./domain/use-cases/RegisterUser.js";
import { PgUserRepository } from "./infrastructure/db/repositories/PgUserRepository.js";

const app = express()
const PORT = 3900;

app.use(express.json())

const userRepo = new PgUserRepository()

const registerUser = new RegisterUser(userRepo);

const userController = new UserController(registerUser);

setupRoutes({ app, userController });

app.listen(3900, () => {
  console.log(`Server listening on port: http://localhost:${PORT}`)
})
