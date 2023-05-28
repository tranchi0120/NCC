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

export enum ETaskType {
  OTHER = 'OTHER',
  COMMON = 'COMMON',
}

export const memberType: { [key: number]: string } = {
  0: 'Staff',
  1: 'Internship',
  2: 'Collaborator'
};

export const memberPosition: { [key: number]: string } = {
  0: 'Intern 0',
  1: 'Intern 1',
  2: 'Intern 2',
  3: 'Intern 3',
  4: 'Fresher -',
  5: 'Fresher',
  6: 'Fresher +',
  7: 'Junior -',
  8: 'Junior',
  9: 'Junior +',
  10: 'Middle -',
  11: 'Middle',
  12: 'Middle +',
  13: 'Senior -',
  14: 'Senior',
  15: 'Senior +'
};
