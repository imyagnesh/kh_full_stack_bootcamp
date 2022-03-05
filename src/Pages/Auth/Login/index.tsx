import React from 'react';
import { Field } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import {
  loginFields,
  loginInitValues,
  LoginInitValueTypes,
} from './loginFields';
import CustomForm from '../../../components/CustomForm';

type Props = {};

const Login = (props: Props) => {
  const navigate = useNavigate();

  const onSubmit = async (values: LoginInitValueTypes) => {
    try {
      const { rememberMe, ...rest } = values;
      const res = await fetch('http://localhost:8080/login', {
        method: 'POST',
        body: JSON.stringify(rest),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      navigate('/');
    } catch (error) {}
  };

  return (
    <CustomForm
      initialValues={loginInitValues}
      fields={loginFields.slice(0, 2)}
      onSubmit={onSubmit}
      btnName="Sign In"
    >
      <div className="flex items-center justify-between">
        <Field {...loginFields[2]} />

        <div className="text-sm">
          <Link
            to="/auth/forgot-password"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Forgot your password?
          </Link>
        </div>
      </div>
    </CustomForm>
  );
};

export default Login;
