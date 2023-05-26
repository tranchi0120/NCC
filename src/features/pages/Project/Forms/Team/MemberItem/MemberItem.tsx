import { CloseOutlined, LeftOutlined } from '@ant-design/icons';
import React, { FC, useMemo, useCallback, useState } from 'react';
import './MemberItem.scss';
import { Select } from 'antd';
import { IUserNotPagging } from '../../../../../../interfaces/interface';
import { EProjectUserType, EUsetNotPaggingType } from '../../../../../../enums/enums';
export interface IMemberProps {
  isChoosed: boolean
  showDeactive?: boolean
  userNotPagging: IUserNotPagging
  positionType?: EProjectUserType
  setMemberSelected: React.Dispatch<React.SetStateAction<IUserNotPagging[]>>
}

const MemberItem: FC<IMemberProps> = ({
  isChoosed,
  showDeactive,
  userNotPagging,
  positionType,
  setMemberSelected
}) => {
  const [userJobTitle, setUsetJobTitle] = useState(0);

  const userLevel = useMemo(() => {
    switch (userNotPagging.level) {
      case 0:
      case 1:
      case 2:
      case 3: {
        return 'Intern';
      }
      case 4:
      case 5:
      case 6: {
        return 'Fresher';
      }
      case 7:
      case 8:
      case 9: {
        return 'Junior';
      }
      case 10:
      case 11:
      case 12: {
        return 'Middle';
      }
      case 13:
      case 14:
      case 15: {
        return 'Senior';
      }
      case null: {
        return '';
      }
    }
  }, []);

  const userType = useMemo(() => {
    switch (userNotPagging.type) {
      case EUsetNotPaggingType.STAFF: {
        return 'staff';
      }
      case EUsetNotPaggingType.COLLABORATOR: {
        return 'Collaborator';
      }
      case EUsetNotPaggingType.INTERNSHIP: {
        return 'Internship';
      }
      case EUsetNotPaggingType.Null: {
        return '';
      }
    }
  }, []);

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
        {isChoosed ? <CloseOutlined /> : <LeftOutlined />}
      </div>
      <div className="member-info">
        <div className='member-info__header'>
          <h3 className="member-info__name">
            {userNotPagging.name}
          </h3>
          {userType === undefined
            ? <span></span>
            : <span className='member-info__type'>{userType}</span>}

          {userLevel === ''
            ? <span></span>
            : <span className='member-info__position'>{userLevel}</span>}

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
