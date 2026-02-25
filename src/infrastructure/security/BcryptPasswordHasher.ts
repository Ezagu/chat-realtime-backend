import bcrypt from "bcrypt"
import type { PasswordHasher } from "../../domain/services/PasswordHasher.js"

export class BcryptPasswordHasher implements PasswordHasher {
  hash = async(password: string) => {
    return await bcrypt.hash(password, 10)
  }

  compare = async(password: string, hashed: string) => {
    return await bcrypt.compare(password, hashed)
  }
}