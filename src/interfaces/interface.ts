import { EProjectStatus, EProjectType } from '../enums/enums';

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
  customerId: number | null
  name: string
  code: string
  dates: string
  note?: string | null
  isAllUser?: boolean | null
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
export interface ITaskResponse {
  name: string
  type: number
  isDeleted: boolean
  id: number
}
export interface IBranch {
  name: string
  displayName: string
  id: number
}
export interface ITask {
  taskId: number
  billable: boolean
}

export interface IUser {
  userId: number
  type: number
  id?: number
}

export interface IProjectTargetUser {
  userId: number
  roleName: string
  id: number
}

export interface IProjectSubmitValue {
  name: string
  code: string
  timeStart: string
  timeEnd: string
  note: string | undefined
  projectType: EProjectType
  customerId: number
  tasks: ITask[]
  users: IUser[]
  projectTargetUsers: IProjectTargetUser[]
  komuChannelId: string | undefined
  isNotifyToKomu: boolean
  isAllUserBelongTo?: boolean | null
}
