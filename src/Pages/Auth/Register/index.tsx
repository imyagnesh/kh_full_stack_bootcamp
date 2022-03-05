import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  RegisterFields,
  RegisterInitValues,
  RegisterInitValueTypes,
} from './registerFields';
import CustomForm from '../../../components/CustomForm';

type Props = {};

const Register = (props: Props) => {
  const navigate = useNavigate();

  const onSubmit = async (values: RegisterInitValueTypes) => {
    const { confirmPassword, ...rest } = values;

    try {
      const res = await fetch('http://localhost:8080/register', {
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
      initialValues={RegisterInitValues}
      fields={RegisterFields}
      onSubmit={onSubmit}
      btnName="Sign In"
    />
  );
};

export default Register;
