import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import React, { FC, useCallback, useEffect, useState } from 'react';
import './MemberItem.scss';
import { Select } from 'antd';
import { IUserNotPagging } from '../../../../../../interfaces/interface';
import { useAppDispatch } from '../../../../../../redux/hooks';
import { addUserPosition, adduserSelected, removeUserPosition, removeUserSelected } from '../../../../../../redux/slice/ProjectSlice';
import { memberPosition, memberType, optionMemberPosition } from '../../../../../../constant/constant';
import { EProjectUserType } from '../../../../../../enums/enums';
export interface IMemberProps {
  isChoosed: boolean
  showDeactive?: boolean
  isFirst?: boolean
  userNotPagging: IUserNotPagging
  positionType?: EProjectUserType
}

const MemberItem: FC<IMemberProps> = ({
  isChoosed,
  showDeactive,
  isFirst,
  userNotPagging,
  positionType
}) => {
  const [userJobTitle, setUsetJobTitle] = useState(optionMemberPosition[0]);
  const dispatch = useAppDispatch();

  const handleSelectMember = useCallback((memberId: number) => {
    if (isChoosed) {
      dispatch(removeUserSelected(memberId));
    } else {
      dispatch(adduserSelected(userNotPagging));
    }
  }, []);

  useEffect(() => {
    if (isFirst === true) {
      setUsetJobTitle(optionMemberPosition[1]);
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    } else if (isFirst === false && optionMemberPosition) {
      setUsetJobTitle(optionMemberPosition[0]);
    }
    if (isChoosed && isFirst === true) {
      dispatch(addUserPosition({ userId: userNotPagging.id, type: 1 }));
    } else if (isChoosed) {
      dispatch(addUserPosition({ userId: userNotPagging.id, type: 0 }));
    }
    return () => {
      dispatch(removeUserPosition(userNotPagging.id));
    };
  }, [optionMemberPosition]);

  if (showDeactive === false && userJobTitle === optionMemberPosition[3]) {
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
          options={optionMemberPosition}
        />
      )}
    </div>
  );
};

export default MemberItem;
