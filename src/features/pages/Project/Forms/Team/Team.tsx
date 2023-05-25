import React, { useState, useEffect } from 'react';
import { Collapse, Select, Space, Input, Checkbox } from 'antd';
import './Team.scss';
import MemberItem from './MemberItem/MemberItem';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { getUserNothing, selectMemberStore } from '../../../../../redux/slice/MemberSlice';
import { GetAllBranchFilter, selectBranchStore } from '../../../../../redux/slice/BranchSlice';
import { IUserNotPagging } from '../../../../../interfaces/interface';

const { Panel } = Collapse;
const { Search } = Input;

const Team = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [userNotPaggings, setUserNotPaggings] = useState<IUserNotPagging[]>([]);
  const [searchInputValue, setSearchInputValue] = useState('');
  const [isCheck, seIsCheck] = useState<boolean>(false);

  const { userNotPaggingList, isLoading } = useAppSelector(selectMemberStore);
  const { branchItem } = useAppSelector(selectBranchStore);

  const onSearch = (value: string): void => console.log(value);
  const onChange = (event: CheckboxChangeEvent): void => {
    seIsCheck(event.target.checked);
  };

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

  useEffect(() => {
    setUserNotPaggings(userNotPaggingList);
  }, [userNotPaggingList]);

  return (
    <div className='team'>
      <Collapse className='team-left'>
        <Panel header="Team" key="1">
          <Space className='team-listMember'>
            <div className='team-left__filter'>
              <Checkbox onChange={onChange}>Show deactive member</Checkbox>
              <Input placeholder="search by name, email" className='team-left__search' />
            </div>
            <div className='team-memberItem'>
              {userNotPaggingList.length > 0 &&
                userNotPaggingList.map((member) => (
                  <MemberItem
                    key={member.id}
                    userNotPagging={member}
                    isChoosed={true}
                    showDeactive={isCheck}
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
                  defaultValue={{ value: 0, label: 'All' }}
                  showSearch
                  style={{ width: 200 }}
                  placeholder="Search to Select"
                  optionFilterProp="children"
                  options={branchOption}
                />
              </div>
              <div className='team-filter__Item'>
                <span className="team-name">Type</span>
                <Select
                  className='team-select'
                  defaultValue={{ value: '-1', label: 'All' }}
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
                  placeholder="input search text"
                  onSearch={onSearch}
                  style={{ width: 150 }}
                  value={searchInputValue}
                  onChange={(e) => setSearchInputValue(e.target.value)} />
              </div>
            </div>
            <div className='team-memberItem'>
              {!isLoading
                ? (userNotPaggings.length > 0 && userNotPaggings.map((item) => (
                  <MemberItem key={item.id} isChoosed={false} userNotPagging={item} />)))
                : (<div>loading....</div>)}
            </div>
          </Space>
        </Panel>
      </Collapse>
    </div>
  );
};

export default Team;
