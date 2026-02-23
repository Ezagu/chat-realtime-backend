export interface TokenService {
  generate: (payload: object) => Promise
  verify: (token: string) => Promise
}