import express from "express"
import { setupRoutes } from "./infrastructure/http/setup.js"

const app = express()
const PORT = 3900;

setupRoutes(app)

app.listen(3900, () => {
  console.log(`Server listening on port: http://localhost:${PORT}`)
})
