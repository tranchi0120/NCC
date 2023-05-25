import { IUserNotPagging } from '../interfaces/interface';

export const handleSortByBranch = (branch: number, filterList: IUserNotPagging[]): IUserNotPagging[] => {
  if (branch !== 0) {
    const memberBranchList = filterList.filter((member) => member.branchId === branch);
    return memberBranchList;
  } else {
    return filterList;
  }
};
