export type UserCreate = {
  username: string
  password: string
}

export type UserLogin = {
  username: string
  password: string
}

export type PublicUser = {
  readonly id: string
  username: string
  createdAt: Date
}

export type User = {
  readonly id: string
  username: string
  password: string
  createdAt: Date
}

