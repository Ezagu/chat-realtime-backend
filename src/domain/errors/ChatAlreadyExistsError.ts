export class ChatAlreadyExistsError extends Error {
  constructor() {
    super('El chat ya existe')
    this.name = 'ChatAlreadyExistsError'
  }
}