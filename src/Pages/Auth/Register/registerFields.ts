import { FieldAttributes } from 'formik';
import Input, { BorderTypes } from '../../../components/Input';
import Select, { OptionType } from '../../../components/Select';

type RegisterInitValueTypes = {
  name: string;
  birthDate: Date;
  email: string;
  password: string;
  confirmPassword: string;
};

export const RegisterInitValues: RegisterInitValueTypes = {
  name: '',
  birthDate: new Date(),
  email: '',
  password: '',
  confirmPassword: '',
};

type FieldsType = FieldAttributes<BorderTypes & { options?: OptionType[] }>;

export const RegisterFields: FieldsType[] = [
  {
    name: 'name',
    component: Input,
    id: 'name',
    type: 'text',
    autoComplete: 'name',
    placeholder: 'Name',
    isFirst: true,
    validate: (value) => {
      if (!value) {
        return 'Required...';
      }
      return undefined;
    },
  },
  {
    name: 'birthDate',
    component: Input,
    id: 'birth-date',
    type: 'date',
    autoComplete: 'bday',
    placeholder: 'Birth Date',
    validate: (value) => {
      if (!value) {
        return 'Required...';
      }
      return undefined;
    },
  },
  {
    name: 'gender',
    component: Select,
    id: 'gender',
    placeholder: 'Gender',
    options: [
      { text: 'Male', value: 'male' },
      { text: 'Female', value: 'female' },
      {
        text: 'Other',
        value: 'other',
      },
    ],
    validate: (value) => {
      if (!value) {
        return 'Required...';
      }
      return undefined;
    },
  },
  {
    name: 'email',
    component: Input,
    id: 'email-address',
    type: 'email',
    autoComplete: 'email',
    placeholder: 'Email address',
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
    autoComplete: 'new-password',
    placeholder: 'Password',
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
    id: 'password',
    type: 'password',
    autoComplete: 'new-password',
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
