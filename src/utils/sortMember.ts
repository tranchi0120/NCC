import { IUserNotPagging } from '../interfaces/interface';

export const handleSortByBranch = (branch: number, filterList: IUserNotPagging[]): IUserNotPagging[] => {
  if (branch !== 0 || branch !== undefined) {
    console.log('branch:', branch);
    const memberBranchList = filterList.filter((member) => {
      // console.log(member);
      return member.branchId === branch;
    });
    return memberBranchList;
  } else {
    return filterList;
  }
};

export const handleSortByPotion = (potionString: number, filterList: IUserNotPagging[]): IUserNotPagging[] => {
  if (potionString !== 0) {
    const memberPotionList = filterList.filter((member) => member.type === potionString);
    return memberPotionList;
  } else {
    return (filterList);
  }
};
