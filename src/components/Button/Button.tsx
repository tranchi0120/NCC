import * as React from 'react';
import clsx from 'clsx';
import { ButtonProps, SpinProps, Button as AButton, Spin } from 'antd';
import { Loading3QuartersOutlined } from '@ant-design/icons';

import './Button.scss';

interface IButtonProps extends ButtonProps {
  children: React.ReactNode
  loading?: boolean
  spinSize?: SpinProps['size']
  isDisabled?: boolean
}

const Button: React.FC<IButtonProps> = ({
  className,
  loading,
  children,
  spinSize,
  isDisabled,
  ...rest
}) => {
  return (
    <AButton
      className={clsx('button', className)}
      type='primary'
      disabled={isDisabled ?? loading}
      {...rest}
    >
      {loading === true
        ? (
          <Spin
            size={spinSize}
            className='spinner'
            indicator={<Loading3QuartersOutlined className='spinner__icon' spin />}
          />)
        : (children)
      }
    </AButton>
  );
};

export default Button;
