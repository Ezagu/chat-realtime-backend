import type { UserId } from "../../../domain/entities/User.js"

let onlineUser: UserId[] = []

export const addOnlineUser = (userId: UserId) => {
  if(!onlineUser.includes(userId)) {
    onlineUser.push(userId)
  }
}

export const removeOnlineUser = (userId: UserId) => {
  onlineUser = onlineUser.filter(id => id !== userId)
}

export const isUserOnline = (userId: UserId) => {
  return onlineUser.includes(userId)
}

export const getOnlineUsers = () => {
  return onlineUser
}