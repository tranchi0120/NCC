export interface IFormikValues {
  userNameOrEmailAddress: string
  password: string
}

export interface IUserLoginData extends IFormikValues {
  rememberClient: boolean
}

export interface ILoginResponse {
  accessToken: string
  encryptedAccessToken: string
  expireInSeconds: number
  userId: number
}

export interface ILoginActionData {
  accessToken: string
  isRemember: boolean
}
