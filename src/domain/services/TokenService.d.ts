export interface TokenService {
  generate: (payload: object) => Promise<string>
  verify: (token: string) => Promise
}