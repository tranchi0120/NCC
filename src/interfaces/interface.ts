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

export enum EProjectStatus {
  ACTIVE = 0,
  DEACTIVE = 1,
  ALL = 2,
}
export interface IAllProjectResponse {
  customerName: string
  name: string
  code: string
  status: number
  pms: string[]
  activeMember: number
  projectType: number
  timeStart: string
  timeEnd: string
  id: number
}
export interface ISortProjectState {
  customerName: string
  projects: IAllProjectResponse[]
}
export interface ILoginFormState {
  userNameOrEmailAddress: string
  password: string
}
export interface IProjectQuantity {
  status: number
  quantity: number
}

export interface IParamsForAllProject {
  status?: EProjectStatus
  searchValue?: string
}
