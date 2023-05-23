import React, { FC } from 'react';
import * as Yup from 'yup';
import { Form as AForm, Field, FieldProps, Formik, FormikHelpers } from 'formik';
import { Select as ASelect, Button } from 'antd';
import InputGroup from '../../../../../components/InputGroup/InputGroup';
// import { RangePickerProps } from 'antd/es/date-picker';
// import dayjs from 'dayjs';
// import type { Dayjs } from 'dayjs';
import clsx from 'clsx';

const ProjectFormSchema = Yup.object().shape({
  name: Yup.string().max(256, 'Too Long!').trim().required('Project Name is required!'),
  code: Yup.string().max(256, 'Too Long!').trim().required('Project Code is required!'),
  customerId: Yup.number().required('Client is required!'),
  dates: Yup.string().trim().required('Dates is required!')
});

interface Values {
  firstName: string
  lastName: string
  email: string
}
const Ganeral: FC = () => {
  // const disabledDate: RangePickerProps['disabledDate'] = (current) => {
  //   return current && current < dayjs().endOf('day');
  // };

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: ''
      }}
      validationSchema={ProjectFormSchema}
      onSubmit={(
        values: Values,
        { setSubmitting }: FormikHelpers<Values>
      ) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 500);
      }}
    >
      {({ errors, touched }) => (
        <AForm>
          <div>
            <label htmlFor="firstName">Client*</label>
            <Field>
              {({ field, form: { errors, touched } }: FieldProps) => (
                <div>
                  <ASelect
                    showSearch
                    size='large'
                    placeholder='Search to Select'
                    optionFilterProp='children'
                    className={clsx(
                      'input-select',
                      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                      errors[field.name] && touched[field.name] && 'input-select--error'
                    )}
                  />
                </div>
              )}
            </Field>
            <Button>+ New Client</Button>
          </div>
          <div>
            <h4 className='input-title'>
              Project Name*
            </h4>

            <InputGroup
              className='form-input input-name'
              inputName='name'
              placeholder='Enter a project name...'
              errors={errors}
              touched={touched}
              autoComplete="off"
            />
          </div>
          <div>
            <h4 className='input-title'>
              Project Code*
            </h4>

            <InputGroup
              className='form-input input-name'
              inputName='name'
              placeholder='Enter a Project Code...'
              errors={errors}
              touched={touched}
              autoComplete="off"
            />
          </div>
          <div>
            <h4 className='input-title'>
              Date*
            </h4>
          </div>

        </AForm>
      )}
    </Formik>
  );
};

export default Ganeral;
