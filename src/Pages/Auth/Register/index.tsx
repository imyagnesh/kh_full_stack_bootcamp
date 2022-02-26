import React from 'react';
import ThemeContext from '../../../context/themeContext';

type Props = {};

const Register = (props: Props) => (
  <ThemeContext.Consumer>
    {({ theme }) => (
      <div>
        <h1>Register</h1>
        <p>Current Theme is {theme}</p>
      </div>
    )}
  </ThemeContext.Consumer>
);

export default Register;
