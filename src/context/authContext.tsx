import { FormikHelpers } from 'formik';
import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from 'react';
import { LoginInitValueTypes } from '../Pages/Auth/Login/loginFields';
import { RegisterInitValueTypes } from '../Pages/Auth/Register/registerFields';

type AuthContextType = {
  user?: AuthResponse;
  handleRegister: (
    values: RegisterInitValueTypes,
    action: FormikHelpers<RegisterInitValueTypes>,
  ) => Promise<void>;
  handleLogin: (
    values: LoginInitValueTypes,
    action: FormikHelpers<LoginInitValueTypes>,
  ) => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState<AuthResponse | undefined>(undefined);

  // Component did mount life cycle method
  useEffect(() => {
    const token = sessionStorage.getItem('@token');
    if (token) {
      setUser(JSON.parse(token));
    }
  }, []);

  const handleRegister = async (
    values: RegisterInitValueTypes,
    action: FormikHelpers<RegisterInitValueTypes>,
  ) => {
    const { confirmPassword, ...rest } = values;
    try {
      const res = await fetch('http://localhost:3000/register', {
        method: 'POST',
        body: JSON.stringify(rest),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      const json = await res.json();
      if (res.ok) {
        sessionStorage.setItem('@token', JSON.stringify(json));
        setUser(json);
      } else {
        throw new Error(json);
      }
    } catch (error) {
      let serverError = 'Something Went Wrong. Please try after sometime';
      if (error instanceof Error) {
        serverError = error.message;
      }
      action.setErrors({ serverError });
    }
  };

  const handleLogin = async (
    values: LoginInitValueTypes,
    action: FormikHelpers<LoginInitValueTypes>,
  ) => {
    try {
      const { rememberMe, serverError, ...rest } = values;
      const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        body: JSON.stringify(rest),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      const json = await res.json();
      if (res.ok) {
        sessionStorage.setItem('@token', JSON.stringify(json));
        setUser(json);
      } else {
        throw new Error(json);
      }
    } catch (error) {
      let serverError = 'Something Went Wrong. Please try after sometime';
      if (error instanceof Error) {
        serverError = error.message;
      }
      action.setErrors({ serverError });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        handleRegister,
        handleLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
