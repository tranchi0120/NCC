import React from 'react';

interface props {
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  name: string
  checked?: boolean
}

const Checkbox = ({ onChange, name, checked }: props): JSX.Element => {
  return <>
    <input type="checkbox" />
  </>;
};

export default Checkbox;
