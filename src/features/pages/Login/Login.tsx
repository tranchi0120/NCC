import * as React from 'react';
import type { FC } from 'react';
import { useMemo, useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';
import { Button, Checkbox, Spin } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { Formik, Form } from 'formik';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import './Login.scss';

import { selectAuthStore, userLogin } from '../../../redux/slice/AuthSlice';
import { IFormikValues, ILoginFormState } from '../../../interfaces/interface';
import InputGroup from '../../../components/InputGroup/InputGroup';
import Noti from '../../../Noti/notification';
import ERoute from '../../../router/RouterLink';
import getAccessToken from '../../../utils/getAccessToken';

const LoginSchema = Yup.object().shape({
  userNameOrEmailAddress: Yup.string()
    .max(256, 'Too Long!')
    .trim()
    .required('Username is required!'),
  password: Yup.string()
    .trim()
    .required('Password is required!')
    .max(32, 'Too long - should be 32 chars maximum.')
});

const Login: FC = () => {
  const userInfo = getAccessToken();
  const [rememberClient, setRememberClient] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const authStore = useAppSelector(selectAuthStore);
  const initFormValue: IFormikValues = useMemo(() => {
    return {
      userNameOrEmailAddress: '',
      password: ''
    };
  }, []);

  const onCheckedChange = useCallback((e: CheckboxChangeEvent) => {
    setRememberClient(e.target.checked);
  }, []);

  const handleLogin = async (values: ILoginFormState): Promise<void> => {
    const user = { ...values, rememberClient };

    const result = await dispatch(userLogin(user));
    console.log('result: ', result);
    if (result.type === 'auth/login/rejected') {
      Noti.error({ description: 'Username or password is incorrect!', message: 'Error' });
    } else {
      navigate(ERoute.HOME);
      Noti.success({ message: 'Success', description: 'Login successfully.' });
    }
  };

  React.useEffect(() => {
    if (userInfo.length > 0) {
      navigate(ERoute.HOME);
    }
  }, []);

  return (
    <div className="wrapper">
      <div className='login'>
        <Formik
          initialValues={initFormValue}
          validationSchema={LoginSchema}
          onSubmit={(values) => {
            void handleLogin(values);
          }}
        >
          {({ errors, touched }) => (
            <Form className='login-form'>
              <h4 className='login-form__title'>LOGIN</h4>
              <div className='login-box'>
                <InputGroup
                  inputName='userNameOrEmailAddress'
                  errors={errors}
                  touched={touched}
                  label='Username'
                  placeholder='Enter your usename...'
                />

                <InputGroup
                  inputName='password'
                  inputType='password'
                  errors={errors}
                  touched={touched}
                  label='Password'
                  placeholder='Enter your password...'
                />
              </div>

              <div className='login-form__footer'>
                <Checkbox
                  name='rememberClient'
                  className='remember-checkbox'
                  value={rememberClient}
                  checked={rememberClient}
                  onChange={onCheckedChange}
                >
                  <span className='login-title__checkbox'> Remember me</span>
                </Checkbox>
                <Button
                  htmlType='submit'
                  type='primary'
                  disabled={authStore.isLoading}
                  className='submit-btn'
                >
                  {authStore.isLoading ? <Spin /> : 'Login'}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
