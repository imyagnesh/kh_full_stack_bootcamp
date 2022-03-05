import React from 'react';
import CustomForm from '../../../components/CustomForm';
import {
  changePasswordFields,
  changePasswordInitValues,
} from './changePasswordFields';

type Props = {};

const ChangePassword = (props: Props) => (
  <CustomForm
    initialValues={changePasswordInitValues}
    fields={changePasswordFields}
    btnName="Change Password"
    onSubmit={() => {}}
  />
);

export default ChangePassword;
