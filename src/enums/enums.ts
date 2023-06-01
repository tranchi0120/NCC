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
  TM,
  FF,
  NB,
  ODC,
  PR,
  TR
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

export enum ETaskType {
  OTHER = 'OTHER',
  COMMON = 'COMMON',
}

export enum EProjectStatus {
  ACTIVE = 0,
  DEACTIVE = 1,
  ALL = 2,
}
