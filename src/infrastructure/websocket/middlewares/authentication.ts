import type { ExtendedError, Socket } from "socket.io";
import type { TokenService } from "../../../domain/services/TokenService.js";
import { parseCookie } from "cookie";
import type { SocketData } from "../../types/socket.js";

export const createSocketAuthMiddleware = (tokenService: TokenService) => {
  return async (socket: Socket<any, any, any, SocketData>, next: (err?: ExtendedError) => void) => {
    const cookies = socket.handshake.headers.cookie;
    if(!cookies || typeof cookies !== 'string') {
      return next(new Error('Missing cookie'))
    }
    const {accessToken} = parseCookie(cookies)
    if(!accessToken || typeof accessToken !== 'string') {
      return next(new Error('Unauthorized'))
    }
    
    try {
      const payload = await tokenService.verify(accessToken)
      socket.data.user = {
        username: payload.username,
        id: payload.id
      }
      next()
    } catch (error) {
      return next(new Error('Internal Server Error'))
    }
  }
}