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

export enum EUserBranch {
  HN = 0,
  KT = 1,
  SG = 2,
  DN = 3,
}

export enum EUsetNotPaggingType {
  STAFF = 0,
  INTERNSHIP = 1,
  COLLABORATOR = 2,
  Null = 3
}
export interface IUserNotPagging {
  name: string
  emailAddress: string
  isActive: boolean
  type: EUsetNotPaggingType
  jobTitle: string
  level: number
  userCode: string
  avatarPath: string
  avatarFullPath: string
  branch: EUserBranch
  branchColor: string
  branchDisplayName: string
  branchId: number
  id: number
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
