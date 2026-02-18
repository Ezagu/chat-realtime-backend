export class ForbiddenChatAccessError extends Error {
  constructor() {
    super('No tienes acceso a este chat')
    this.name = 'ForbiddenChatAccessError'
  }
}