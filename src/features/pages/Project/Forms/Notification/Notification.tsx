import React, { useState } from 'react';
import { Checkbox, Input } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

const Notification: React.FC = () => {
  const [isCheck, seIsCheck] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const onChange = (event: CheckboxChangeEvent): void => {
    seIsCheck(event.target.checked);
  };
  return (
    <div>
      <Checkbox onChange={onChange}>Gửi thông báo đến KOMU</Checkbox>
      <Input placeholder="Komu channel Id" disabled={!isCheck} />
    </div>
  );
};

export default Notification;
