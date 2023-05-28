import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import React, { FC, useCallback, useState } from 'react';
import './MemberItem.scss';
import { Select } from 'antd';
import { IUserNotPagging } from '../../../../../../interfaces/interface';
import { memberPosition, memberType } from '../../../../../../enums/enums';
export interface IMemberProps {
  isChoosed: boolean
  showDeactive?: boolean
  userNotPagging: IUserNotPagging
  setMemberSelected: React.Dispatch<React.SetStateAction<IUserNotPagging[]>>
}

const MemberItem: FC<IMemberProps> = ({
  isChoosed,
  showDeactive,
  userNotPagging,
  setMemberSelected
}) => {
  const [userJobTitle, setUsetJobTitle] = useState(0);

  const handleSelectMember = useCallback((memberId: number) => {
    if (isChoosed) {
      setMemberSelected((prev) => {
        return prev.filter((member) => member.id !== memberId);
      });
    } else {
      setMemberSelected((prev) => [...prev, userNotPagging]);
    }
  }, []);

  if (showDeactive === false && userJobTitle === 3) {
    return null;
  }

  return (
    <div className='member'>
      <div className='member-icon' onClick={() => handleSelectMember(userNotPagging.id)}>
        {isChoosed ? <RightOutlined /> : <LeftOutlined />}
      </div>
      <div className="member-info">
        <div className='member-info__header'>
          <h3 className="member-info__name">
            {userNotPagging.name}
          </h3>
          {userNotPagging.type !== null && <span className='member-info__type'>{memberType[userNotPagging.type]}</span>}

          {userNotPagging.level !== null && <span className='member-info__position'>{memberPosition[userNotPagging.level]}</span>}

        </div>
        <p className="member-info__email">{userNotPagging.emailAddress}</p>
      </div>
      {isChoosed && (
        <Select
          className='input-select-type'
          value={userJobTitle}
          onChange={(value) => setUsetJobTitle(value)}
          options={[
            { value: 0, label: 'Member' },
            { value: 1, label: 'Project Manager' },
            { value: 2, label: 'Shadow' },
            { value: 3, label: 'Deactive' }
          ]}
        />
      )}
    </div>
  );
};

export default MemberItem;
