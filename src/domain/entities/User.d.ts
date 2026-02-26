export type UserId = string

export type UserCreate = {
  username: string
  password: string
}

export type UserLogin = {
  username: string
  password: string
}

export type PublicUser = {
  readonly id: UserId
  username: string
  createdAt: Date
}

export type User = PublicUser & {
  password: string
}

