import React, { useState, useEffect, useMemo, useDeferredValue } from 'react';
import { Collapse, Select, Space, Input, Checkbox } from 'antd';
import './Team.scss';
import MemberItem from './MemberItem/MemberItem';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { getUserNothing, selectMemberStore } from '../../../../../redux/slice/MemberSlice';
import { GetAllBranchFilter, selectBranchStore } from '../../../../../redux/slice/BranchSlice';
import { IUserNotPagging } from '../../../../../interfaces/interface';
import { CircularProgress } from '@material-ui/core';

const { Panel } = Collapse;
const { Search } = Input;

const Team = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [userNotPaggings, setUserNotPaggings] = useState<IUserNotPagging[]>([]);
  const [memberSelected, setMemberSelected] = useState<IUserNotPagging[]>([]);
  const [searchInputValue, setSearchInputValue] = useState('');
  const [isDeactive, seIsDeactive] = useState<boolean>(false);
  const [branchFilter, setBranchFilter] = useState(0);
  const [position, setPosition] = useState<number | string>('all');
  const deferredSearchInputValue = useDeferredValue(searchInputValue);
  const [searchMemberValue, setSearchMemberValue] = useState('');
  const deferredMemberValue = useDeferredValue(searchMemberValue);

  const { userNotPaggingList, isLoading } = useAppSelector(selectMemberStore);
  const { branchItem } = useAppSelector(selectBranchStore);

  const branchOption = branchItem.map((branch) => ({
    value: branch.id,
    label: branch.displayName
  }));

  useEffect(() => {
    const fetchUsetNotPagging = async (): Promise<void> => {
      await dispatch(getUserNothing());
    };
    const fechAllBranchFilter = async (): Promise<void> => {
      await dispatch(GetAllBranchFilter());
    };
    void fetchUsetNotPagging();
    void fechAllBranchFilter();
  }, []);

  const userNotPaggingFilter = useMemo(() => {
    const data = userNotPaggings.filter((item) => {
      const matchesWithSearchInput =
        item.name.includes(deferredSearchInputValue) ||
        item.emailAddress.includes(deferredSearchInputValue);

      if (branchFilter === 0 && position === 'all') {
        return matchesWithSearchInput;
      }
      if (branchFilter === 0) {
        return matchesWithSearchInput && position === item.type;
      }
      if (position === 'all') {
        return matchesWithSearchInput && branchFilter === item.branchId;
      }
      return (
        item.branchId === branchFilter &&
        item.type === position &&
        matchesWithSearchInput
      );
    });

    return data.filter((item) => {
      return !memberSelected.some((member) => member.id === item.id);
    });
  }, [branchFilter, position, deferredSearchInputValue, userNotPaggings, memberSelected]);

  const listMemberFilter = useMemo(() => {
    return memberSelected.filter((member) => {
      const matchesWithMemberValue =
        member.name.includes(deferredMemberValue) ||
        member.emailAddress.includes(deferredMemberValue);

      return matchesWithMemberValue;
    });
  }, [memberSelected, deferredMemberValue]);

  useEffect(() => {
    setUserNotPaggings(userNotPaggingList);
  }, [userNotPaggingList]);

  return (
    <div className='team'>
      <Collapse className='team-left'>
        <Panel header="Team" key="1">
          <Space className='team-listMember'>
            <div className='team-left__filter'>
              <Checkbox onChange={(e) => seIsDeactive(e.target.checked)}>Show deactive member</Checkbox>
              <Search
                placeholder="search by name, email"
                className='team-left__search'
                value={searchMemberValue}
                onChange={e => setSearchMemberValue(e.target.value)} />
            </div>
            <div className='team-memberItem team-leftList'>
              {listMemberFilter.length > 0 &&
                listMemberFilter.map((member) => (
                  <MemberItem
                    setMemberSelected={setMemberSelected}
                    key={member.id}
                    userNotPagging={member}
                    isChoosed={true}
                    showDeactive={isDeactive}
                  />
                ))}
            </div>
          </Space>
        </Panel>
      </Collapse>
      <Collapse className='team-right'>
        <Panel header="Select team member" key="1">
          <Space wrap className=''>
            <div className="team-filter">
              <div className='team-filter__Item'>
                <span className="team-name">Branch</span>
                <Select
                  className='team-select'
                  showSearch
                  value={branchFilter}
                  // defaultValue={{ value: 0, label: 'All' }}
                  style={{ width: 200 }}
                  placeholder="Search to Select"
                  optionFilterProp="children"
                  options={branchOption}
                  onChange={(option) => setBranchFilter(option)}
                />
              </div>
              <div className='team-filter__Item'>
                <span className="team-name">Type</span>
                <Select
                  className='team-select'
                  value={position}
                  onChange={(option) => setPosition(option)}
                  showSearch
                  style={{ width: 200 }}
                  placeholder="Search to Select"
                  optionFilterProp="children"
                  options={[
                    { value: 'all', label: 'All' },
                    { value: 0, label: 'Staff' },
                    { value: 1, label: 'Internship' },
                    { value: 2, label: 'Collaborator' }
                  ]}
                />
              </div>
              <div>
                <Search
                  className='team-searchMember'
                  placeholder="input search text"
                  style={{ width: 150 }}
                  value={searchInputValue}
                  onChange={(e) => setSearchInputValue(e.target.value)} />
              </div>
            </div>
            <div className='team-memberItem'>
              {!isLoading
                ? (userNotPaggingFilter.length > 0 && userNotPaggingFilter.map((item) => (
                  <MemberItem key={item.id} isChoosed={false} userNotPagging={item} setMemberSelected={setMemberSelected} />)))
                : (<div className='team-loading'><CircularProgress /></div>)}
              {userNotPaggingFilter.length === 0 && <h3>No data found</h3>}
            </div>
          </Space>
        </Panel>
      </Collapse>
    </div>
  );
};

export default Team;
