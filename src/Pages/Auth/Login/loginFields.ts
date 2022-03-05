import {
  FieldAttributes,
  FieldConfig,
  GenericFieldHTMLAttributes,
} from 'formik';
import Checkbox, { CheckboxProps } from '../../../components/Checkbox';
import Input, { BorderTypes, InputProps } from '../../../components/Input';

export type LoginInitValueTypes = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export const loginInitValues: LoginInitValueTypes = {
  email: '',
  password: '',
  rememberMe: false,
};

export const loginFields: FieldAttributes<BorderTypes>[] = [
  {
    name: 'email',
    component: Input,
    id: 'email-address',
    type: 'email',
    autoComplete: 'email',
    placeholder: 'Email address',
    isFirst: true,
    validate: (value) => {
      if (!value) {
        return 'Required...';
      }
      return undefined;
    },
  },
  {
    name: 'password',
    component: Input,
    id: 'password',
    type: 'password',
    autoComplete: 'current-password',
    placeholder: 'Password',
    isLast: true,
    validate: (value) => {
      if (!value) {
        return 'Required...';
      }
      return undefined;
    },
  },
  {
    name: 'rememberMe',
    component: Checkbox,
    children: 'Remember Me',
  },
];
