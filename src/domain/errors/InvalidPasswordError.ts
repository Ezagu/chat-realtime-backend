export class InvalidPasswordError extends Error {
  constructor() {
    super('Contraseña incorrecta')
    this.name = 'InvalidPasswordError'
  }
}