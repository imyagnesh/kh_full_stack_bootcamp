import { FieldProps } from 'formik';
import React, { memo } from 'react';

export type CheckboxProps = {} & FieldProps &
  React.InputHTMLAttributes<HTMLInputElement> &
  React.LabelHTMLAttributes<HTMLLabelElement>;

const Checkbox = ({
  field: { checked, onChange, name },
  id,
  children,
  ...props
}: CheckboxProps) => (
  <div className="flex items-center">
    <input
      type="checkbox"
      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
      id={id}
      name={name}
      checked={checked}
      onChange={onChange}
      {...props}
    />
    <label htmlFor={id} className="ml-2 block text-sm text-gray-900">
      {children}
    </label>
  </div>
);

export default memo(Checkbox);
