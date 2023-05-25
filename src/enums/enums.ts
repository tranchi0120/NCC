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
  TM = 'TM',
  FF = 'FF',
  NB = 'NB',
  ODC = 'ODC',
  PR = 'PR',
  TR = 'TR'
}

export enum EProjectUserType {
  MEMBER,
  PROJECT_MANAGER,
  SHADOW,
  DEACTIVE,
}

export enum EUsetNotPaggingType {
  STAFF = 0,
  INTERNSHIP = 1,
  COLLABORATOR = 2,
}

export enum EUserBranch {
  HN = 0,
  KT = 1,
  SG = 2,
  DN = 3,
}
