export class ChatNotFoundError extends Error {
  constructor(){
    super('Chat no encontrado')
    this.name = 'ChatNotFoundError'
  }
}