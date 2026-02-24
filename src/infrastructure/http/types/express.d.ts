import type { PublicUser } from "../domain/entities/User.js";

declare global {
  namespace Express {
    interface Request {
      user?: PublicUser
    }
  }
}