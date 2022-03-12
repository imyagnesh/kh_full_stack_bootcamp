import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Auth/Login';
import AuthLayout from './Layout/AuthLayout';
import Register from './Pages/Auth/Register';
import ForgotPassword from './Pages/Auth/ForgotPassword';
import ChangePassword from './Pages/Auth/ChangePassword';
import MainLayout from './Layout/MainLayout';
import { ProductsProvider } from './context/productsContext';
import { CartProvider } from './context/cartContext';

type Props = {};

const App = (props: Props) => (
  <Routes>
    <Route
      path="/"
      element={
        <ProductsProvider>
          <CartProvider>
            <MainLayout />
          </CartProvider>
        </ProductsProvider>
      }
    >
      <Route index element={<Home />} />
    </Route>
    <Route path="/auth" element={<AuthLayout />}>
      <Route index element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="change-password" element={<ChangePassword />} />
    </Route>
  </Routes>
);

export default App;
