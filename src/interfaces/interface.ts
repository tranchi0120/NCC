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
export enum EProjectStatusTitle {
  ACTIVE = 'Active Projects',
  DEACTIVE = 'Deactive Projects',
  ALL = 'All Projects',
}

export enum EProjectActionName {
  CREATE = 'CREATE',
  EDIT = 'EDIT',
  VIEW = 'VIEW',
}

export enum EProjectType {
  TM = 'Time & Materials',
  FF = 'Fixed Fee',
  NB = 'Non-Billable',
  ODC = 'ODC',
  P = 'Product',
  T = 'Training'
}
export interface ISortProjectState {
  customerName: string
  projects: IAllProjectResponse[]
}
export interface ILoginFormState {
  userNameOrEmailAddress: string
  password: string
}
export enum EProjectStatus {
  ACTIVE = 0,
  DEACTIVE = 1,
  ALL = 2,
}
export interface IProjectQuantity {
  status: number
  quantity: number
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
export interface IParamsForAllProject {
  status?: EProjectStatus
  searchValue?: string
}
