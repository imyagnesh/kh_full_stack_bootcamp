import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Auth/Login';
import AuthLayout from './Layout/AuthLayout';
import Register from './Pages/Auth/Register';
import { ThemeProvider } from './context/themeContext';

type Props = {};

const App = (props: Props) => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/auth" element={<AuthLayout />}>
      <Route index element={<Login />} />
      <Route path="register" element={<Register />} />
    </Route>
  </Routes>
);

export default App;
