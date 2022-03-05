import classNames from 'classnames';
import { FieldProps } from 'formik';
import React, { memo } from 'react';

type TopBorderType = {
  isFirst?: boolean;
  isLast?: never;
};

type BottomBorderType = {
  isFirst?: never;
  isLast?: boolean;
};

export type BorderTypes = TopBorderType | BottomBorderType;

export type OptionType = { value: string; text: string };

export type InputProps = {
  options?: OptionType[];
} & BorderTypes &
  FieldProps &
  React.SelectHTMLAttributes<HTMLSelectElement>;

const Select = ({
  field: { name, ...fieldProps },
  form: { touched, errors },
  options,
  id,
  placeholder,
  isFirst,
  isLast,
  ...props
}: InputProps) => {
  const hasError = touched[name] && !!errors[name];
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {placeholder}
      </label>
      <select
        id={id}
        className={classNames(
          'appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm',
          {
            'rounded-t-md': isFirst || hasError,
            'rounded-b-md': isLast || hasError,
            'border-red-400 focus:ring-red-500 focus:border-red-500': hasError,
          },
        )}
        name={name}
        {...fieldProps}
        {...props}
      >
        <option value="">Please Select {placeholder}</option>
        {options?.map((x, i) => (
          <option key={x.value} value={x.value}>
            {x.text}
          </option>
        ))}
      </select>
      {hasError && <p className="text-xs text-red-500 my-1">{errors[name]}</p>}
    </div>
  );
};

export default memo(Select);