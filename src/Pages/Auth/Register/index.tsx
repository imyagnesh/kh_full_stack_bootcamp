import React from 'react';
import { Field } from 'formik';
import { RegisterFields, RegisterInitValues } from './registerFields';
import CustomForm from '../../../components/CustomForm';

type Props = {};

const Register = (props: Props) => (
  <CustomForm
    initialValues={RegisterInitValues}
    fields={RegisterFields}
    onSubmit={(values) => {
      console.log(values);
    }}
    btnName="Sign In"
  />
);

export default Register;
