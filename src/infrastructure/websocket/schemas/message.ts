import z from "zod";
import type { SendMessageDto } from "../../../domain/entities/Message.js";

const MessageSendSchema = z.object({
  content: z.string().trim().nonempty().max(255),
  chatId: z.string().nonempty(),
})

export const validateMessageSend = (sendMessage: SendMessageDto) => {
  return MessageSendSchema.safeParse(sendMessage)
}