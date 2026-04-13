import z from "zod";
import type { SendMessagePayload } from "../../../domain/entities/Message.js";

const MessageSendSchema = z.object({
  text: z.string().trim().nonempty().max(255),
  toUserId: z.string().nonempty()
})

export const validateMessageSend = (sendMessage: SendMessagePayload) => {
  return MessageSendSchema.safeParse(sendMessage)
}