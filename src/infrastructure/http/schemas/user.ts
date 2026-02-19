import z from "zod";
import type { UserCreate } from "../../../domain/entities/User.js";

const UserSchema = z.object({
  username: z
            .string("Nombre de usuario debe ser un string")
            .trim()
            .nonempty("Ingrese un nombre de usuario"),
  password: z
            .string("Contraseña debe ser un string")
            .trim()
            .nonempty("Ingrese una contraseña")
})

export const validateUser = (object: UserCreate) => {
  return UserSchema.safeParse(object);
}