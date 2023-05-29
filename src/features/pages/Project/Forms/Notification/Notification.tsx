import React from 'react';
import { Checkbox, Input } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { CheckNotifyToKomu, UpdateNotifyToKomu, selectProjectStore } from '../../../../../redux/slice/ProjectSlice';

const Notification: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    projectForm: {
      notification: { isNotifyToKomu, komuChannelId }
    }
  } = useAppSelector(selectProjectStore);

  const onChange = (event: CheckboxChangeEvent): void => {
    dispatch(CheckNotifyToKomu(event.target.checked));
  };
  return (
    <div>
      <Checkbox onChange={onChange}>Gửi thông báo đến KOMU</Checkbox>
      <Input
        style={{ marginTop: '10px' }}
        placeholder="Komu channel Id"
        disabled={!isNotifyToKomu}
        value={komuChannelId}
        onChange={(e) => dispatch(UpdateNotifyToKomu(e.target.value))}
      />
    </div>
  );
};

export default Notification;
