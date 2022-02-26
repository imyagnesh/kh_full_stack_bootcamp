import React from 'react';
import { Formik } from 'formik';
import classNames from 'classnames';

type Props = {};

const Login = (props: Props) => (
  <Formik
    initialValues={{
      email: '',
      password: '',
      rememberMe: false,
    }}
    onSubmit={(values) => {
      console.log(values);
    }}
    validate={(values) => {
      const errors = {} as typeof values;
      if (!values.email) {
        errors.email = 'Required...';
      }
      if (!values.password) {
        errors.password = 'Required...';
      }
      return errors;
    }}
  >
    {({
      values,
      handleChange,
      handleSubmit,
      handleBlur,
      errors,
      touched,
      dirty,
      isValid,
    }) => (
      <form className="mt-8 space-y-6" noValidate onSubmit={handleSubmit}>
        <input type="hidden" name="remember" defaultValue="true" />
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className={classNames(
                'appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm',
                {
                  'border-red-400 focus:ring-red-500 focus:border-red-500 rounded-b-md':
                    touched.email && !!errors.email,
                },
              )}
              placeholder="Email address"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {touched.email && errors.email && (
              <p className="text-xs text-red-500 my-1">{errors.email}</p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className={classNames(
                'appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm',
                {
                  'border-red-400 focus:ring-red-500 focus:border-red-500 rounded-t-md':
                    touched.password && !!errors.password,
                },
              )}
              placeholder="Password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {touched.password && errors.password && (
              <p className="text-xs text-red-500 my-1">{errors.password}</p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="rememberMe"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              checked={values.rememberMe}
              onChange={handleChange}
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-900"
            >
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <a
              href="#abc"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Forgot your password?
            </a>
          </div>
        </div>

        <div>
          <button
            disabled={!(dirty && isValid)}
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-slate-500"
          >
            Sign in
          </button>
        </div>
      </form>
    )}
  </Formik>
);

export default Login;
