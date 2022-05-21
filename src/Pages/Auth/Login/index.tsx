import React from 'react';
import { Field } from 'formik';
import { Link } from 'react-router-dom';
import { loginFields, loginInitValues } from './loginFields';
import CustomForm from '../../../components/CustomForm';

type Props = {};

const Login = (props: Props) => (
  <CustomForm
    initialValues={loginInitValues}
    fields={loginFields.slice(0, 2)}
    onSubmit={(values) => {
      console.log(values);
    }}
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

export default Login;
