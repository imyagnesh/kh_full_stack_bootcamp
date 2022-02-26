import { Field, FieldAttributes, Formik, FormikConfig } from 'formik';
import React from 'react';
import { BorderTypes } from '../Input';

type Props<T> = {
  fields: FieldAttributes<BorderTypes>[];
  btnName: string;
} & FormikConfig<T>;

const CustomForm = <T extends {} = {}>({
  fields,
  children,
  btnName,
  ...props
}: Props<T>) => (
  <Formik {...props}>
    {({ handleSubmit, dirty, isValid }) => (
      <form className="mt-8 space-y-6" noValidate onSubmit={handleSubmit}>
        <input type="hidden" name="remember" defaultValue="true" />
        <div className="rounded-md shadow-sm -space-y-px">
          {fields.map((x) => (
            <Field key={x.name} {...x} />
          ))}
        </div>
        {children}
        <div>
          <button
            disabled={!(dirty && isValid)}
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-slate-500"
          >
            {btnName}
          </button>
        </div>
      </form>
    )}
  </Formik>
);

export default CustomForm;
