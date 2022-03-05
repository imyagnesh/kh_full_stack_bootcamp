import { FieldAttributes } from 'formik';
import Input, { BorderTypes } from '../../../components/Input';

export const changePasswordInitValues = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
};

export const changePasswordFields: FieldAttributes<BorderTypes>[] = [
  {
    name: 'oldPassword',
    component: Input,
    placeholder: 'Old Password',
    isFirst: true,
    validate: (value) => {
      if (!value) {
        return 'Required...';
      }
      return undefined;
    },
  },
  {
    name: 'newPassword',
    component: Input,
    placeholder: 'New Password',
    validate: (value) => {
      if (!value) {
        return 'Required...';
      }
      return undefined;
    },
  },
  {
    name: 'confirmPassword',
    component: Input,
    placeholder: 'Confirm Password',
    isLast: true,
    validate: (value) => {
      if (!value) {
        return 'Required...';
      }
      return undefined;
    },
  },
];
