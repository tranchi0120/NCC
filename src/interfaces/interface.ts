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
export interface ILoginFormState {
  userNameOrEmailAddress: string
  password: string
}
export interface IProjectQuantity {
  status: number
  quantity: number
}
export interface ISortProjectState {
  customerName: string
  projects: IAllProjectResponse[]
}

export interface IParamsForAllProject {
  status?: EProjectStatus
  searchValue?: string
}
export interface ISelectOptionState {
  value: number
  label: string
}

export interface IFormValues {
  customerId: number | undefined
  name: string
  code: string
  dates: string
  note?: string
  isAllUser?: boolean
}

export interface IModalContent {
  title: string
  children: React.ReactNode
}

export interface ICustomerResponse {
  name: string
  id: number
}
export interface IUserNotPagging {
  name: string
  id: number
  emailAddress: string
  isActive: boolean
  type: number
  jobTitle?: string
  level: number
  avatarFullPath: string
  avatarPath: string
  branch: number
  branchColor?: string
  branchDisplayName?: string
  branchId: number
  userCode?: string
}

export enum ETaskType {
  OTHER = 0,
  COMMON = 1,
}
export interface ITaskResponse {
  name: string
  type: ETaskType
  isDeleted: boolean
  id: number
}

export interface IBranch {
  name: string
  displayName: string
  id: number
}
