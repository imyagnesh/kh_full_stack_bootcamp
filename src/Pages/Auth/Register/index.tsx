import React from 'react';
import {
  RegisterFields,
  RegisterInitValues,
  RegisterInitValueTypes,
} from './registerFields';
import CustomForm from '../../../components/CustomForm';
import { useAuth } from '../../../context/authContext';

type Props = {};

const Register = (props: Props) => {
  const { handleRegister } = useAuth();

  return (
    <CustomForm
      initialValues={RegisterInitValues}
      fields={RegisterFields}
      onSubmit={handleRegister}
      btnName="Sign In"
    />
  );
};

export default Register;
