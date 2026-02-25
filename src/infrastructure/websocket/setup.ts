import type { Server } from "socket.io";
import { parseCookie } from "cookie";
import type { TokenService } from "../../domain/services/TokenService.js";

export const setupSocket = ({ io, tokenService } : { io: Server, tokenService: TokenService }) => {
  io.use(async (socket, next) => {
    const cookies = socket.handshake.headers.cookie;
    if(!cookies || typeof cookies !== 'string') {
      return next(new Error('Unauthorized'))
    }
    const {accessToken} = parseCookie(cookies)
    if(!accessToken || typeof accessToken !== 'string') {
      return next(new Error('Unauthorized'))
    }
    try {
      const payload = await tokenService.verify(accessToken)
      socket.data.user = {username: payload.username, id: payload.id}
      next()
    } catch (error) {
      return next(new Error('Unauthorized'))
    }
    
  })

  io.on('connection', socket => {
    console.log(`User: ${socket.data.user.username} conectado`)
  })
}