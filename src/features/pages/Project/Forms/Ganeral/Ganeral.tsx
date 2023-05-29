import * as React from 'react';
import type { FC } from 'react';
import { useMemo, useState, useEffect, useContext } from 'react';
import * as Yup from 'yup';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { ErrorMessage, Field, FieldInputProps, FieldProps, Form, Formik } from 'formik';
import { PlusOutlined } from '@ant-design/icons';
import ATexArea from 'antd/es/input/TextArea';
import { RangePickerProps } from 'antd/es/date-picker';
import { RangeValue } from 'rc-picker/lib/interface';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { Select as ASelect, DatePicker as ADatePicker, Checkbox as ACheckbox } from 'antd';

import './General.scss';
import { AppContext } from '../../../../../context/AppProvider';
import { ICustomerResponse, IFormValues, ISelectOptionState } from '../../../../../interfaces/interface';
import { EProjectType } from '../../../../../enums/enums';
import Button from '../../../../../components/Button/Button';
import InputGroup from '../../../../../components/InputGroup/InputGroup';
import customer from '../../../../../services/customer';
import getProjectType from '../../../../../utils/getProjectType';

const ProjectFormSchema = Yup.object().shape({
  name: Yup.string().max(256, 'Too Long!').trim().required('Project Name is required!'),
  code: Yup.string().max(256, 'Too Long!').trim().required('Project Code is required!'),
  customerId: Yup.number().required('Client is required!'),
  dates: Yup.string().trim().required('Dates is required!')
});

const dateFormat = 'DD/MM/YYYY';

const Ganeral: FC = () => {
  const { formRef } = useContext(AppContext);
  const [clientOptions, setClientOptions] = useState<ICustomerResponse[]>([]);
  const [projectTypeId, setProjectTypeId] = useState<EProjectType>(EProjectType.FF);

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    return current && current < dayjs().endOf('day');
  };

  const projectType: EProjectType[] = [
    EProjectType.TM,
    EProjectType.FF,
    EProjectType.NB,
    EProjectType.ODC,
    EProjectType.PR,
    EProjectType.TR
  ];

  const selectOption: ISelectOptionState[] = useMemo(() => {
    const renderClientOption = clientOptions.map((client) => ({
      value: client.id,
      label: client.name
    }));
    return renderClientOption;
  }, [clientOptions]);

  const initFormValue: IFormValues = useMemo(() => {
    return {
      customerId: undefined,
      name: '',
      code: '',
      dates: '',
      note: undefined,
      isAllUser: undefined
    };
  }, []);

  const handleDatesChange = (
    values: RangeValue<dayjs.Dayjs>,
    field: FieldInputProps<string>,
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
  ): void => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!values) {
      setFieldValue(field.name, '');
      return;
    }
    console.log(values);
    const data = values
      .map((value) => (((value?.toISOString()) != null) ? value.toISOString() : ''))
      .join(',')
      .trim();

    setFieldValue(field.name, data);
  };

  const onSubmitForm = (formValues: IFormValues): void => {
    console.log('dates:', formValues.dates);
    const [timeStart, timeEnd] = formValues.dates.split(',');
    const { dates, ...rest } = formValues;
    const submitValues = { ...rest, timeStart, timeEnd, projectType: projectTypeId };
    console.log(submitValues);
  };

  useEffect(() => {
    const fetchCustomer = async (): Promise<void> => {
      const result = await customer.getAllClient();
      setClientOptions(result);
    };
    void fetchCustomer();
  }, []);

  return (
    <Formik
      innerRef={formRef}
      initialValues={initFormValue}
      validationSchema={ProjectFormSchema}
      onSubmit={onSubmitForm}
    >
      {({ errors, touched, setFieldValue, handleBlur }) => {
        return (
          <Form className='create-form'>
            <div className='wrapper-input form-select'>
              <h4 className='input-title'>
                Client*
              </h4>
              <Field name='customerId'>
                {({ field, form: { errors, touched } }: FieldProps) => (
                  <div className='wrapper-client-input'>
                    <ASelect
                      showSearch
                      size='large'
                      placeholder='Search to Select'
                      optionFilterProp='children'
                      filterOption={(input, option) => (option?.label ?? '').includes(input)}
                      filterSort={(optionA, optionB) => (optionA?.label ?? '')
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? '').toLowerCase())}
                      options={selectOption}
                      {...field}
                      onBlur={handleBlur(field.name)}
                      onChange={(value: number) => {
                        setFieldValue(field.name, value);
                      }}
                      className={clsx(
                        'input-select',
                        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                        errors[field.name] && touched[field.name] && 'input-select--error'
                      )} />
                    <ErrorMessage
                      component='div'
                      className='client-message-error'
                      name={field.name} />
                  </div>
                )}
              </Field>

              <Button className='new-client-btn'>
                <PlusOutlined /> New Client
              </Button>
            </div>
            <div className='wrapper-input'>
              <h4 className='input-title'>
                Project Name*
              </h4>

              <InputGroup
                className='form-input input-name'
                inputName='name'
                placeholder='Enter a project name...'
                errors={errors}
                touched={touched}
                autoComplete='off' />
            </div>
            <div className='wrapper-input'>
              <h4 className='input-title'>
                Project Code<sup>*</sup>
              </h4>

              <InputGroup
                className='form-input'
                inputName='code'
                placeholder='Enter a project code...'
                errors={errors}
                touched={touched}
                autoComplete='off' />
            </div>
            <div className='wrapper-input'>
              <h4 className='input-title'>
                Dates*
              </h4>

              <Field name='dates'>
                {({ field, form: { errors, touched } }: FieldProps) => (
                  <div className='wrapper-picker'>
                    <ADatePicker.RangePicker
                      size='large'
                      className={clsx(
                        'datepicker-custom',
                        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                        errors[field.name] && touched[field.name] && 'datepicker-custom--error'
                      )}
                      format={dateFormat}
                      disabledDate={disabledDate}
                      onBlur={handleBlur(field.name)}
                      onChange={(values) => {
                        handleDatesChange(values, field, setFieldValue);
                      }} />
                    <ErrorMessage component='div' className='dates-message-error' name={field.name} />
                  </div>
                )}
              </Field>
            </div>
            <div className='wrapper-input'>
              <h4 className='input-title'>Note</h4>
              <Field name='note'>
                {({ field }: FieldProps) => (
                  <ATexArea
                    className='input-note'
                    rows={2}
                    {...field}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                      setFieldValue(field.name, e.target.value);
                    }} />
                )}
              </Field>
            </div>
            <div className='wrapper-input'>
              <h4 className='input-title'>All user</h4>
              <Field name='isAllUser'>
                {({ field }: FieldProps) => (
                  <ACheckbox
                    checked={field.value}
                    className='input-checkbox'
                    onChange={(e: CheckboxChangeEvent) => {
                      setFieldValue(field.name, e.target.checked);
                    }}
                  >
                    Auto add user as a member of this project when creating new user
                  </ACheckbox>
                )}
              </Field>
            </div>
            <div className='wrapper-input'>
              <h4 className='input-title'>
                Project Type*
              </h4>
              <div className='wrapper-project-type'>
                {projectType.length > 0 &&
                  projectType.map((type, index) => (
                    <Button
                      key={index}
                      className={clsx(
                        'type-btn-custom',
                        projectTypeId === type && 'type-btn-custom--active'
                      )}
                      onClick={() => setProjectTypeId(type)}
                    >
                      {getProjectType(type)}
                    </Button>
                  ))}
              </div>
            </div>
          </Form>
        );
      }
      }
    </Formik >
  );
};

export default Ganeral;
