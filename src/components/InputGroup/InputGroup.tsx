import * as React from 'react';
import type { FC } from 'react';
import clsx from 'clsx';
import { ErrorMessage, Field, FormikErrors, FormikTouched } from 'formik';
import './InputGroup.scss';

interface IInputGroupProps {
  className?: string
  label?: string
  inputName: string
  placeholder?: string
  inputType?: 'password' | 'text' | 'checkbox'
  errors: FormikErrors<any>
  touched: FormikTouched<any>
  autoComplete: string
}

const InputGroup: FC<IInputGroupProps> = ({
  className,
  errors,
  touched,
  autoComplete,
  label,
  inputName,
  inputType,
  placeholder
}) => {
  return (
    <div className={clsx('group-input', className)}>
      <label htmlFor={inputName} className='group-input__label'>
        {label}
      </label>
      <Field
        className="group-input__text"
        id={inputName}
        name={inputName}
        type={inputType}
        placeholder={placeholder}
        autoComplete={autoComplete}
      />
      <ErrorMessage className='group-input__message-error' component='div' name={inputName} />
    </div>
  );
};

export default InputGroup;
