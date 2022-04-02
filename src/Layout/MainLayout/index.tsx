import React, { useState, useCallback, memo } from 'react';

import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import Header from '../../components/Header';
import ShoppingBag from '../../components/ShoppingBag';
import Errors from '../../components/Errors';

const MainLayout = () => {
  const { user, handleLogout } = useAuth();
  const [open, setOpen] = useState(false);

  const toggleCart = useCallback(() => {
    setOpen((val) => !val);
  }, []);

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <>
      <Header toggleCart={toggleCart} handleLogout={handleLogout} />
      <ShoppingBag open={open} toggleCart={toggleCart} />
      <Errors />

      <Outlet />
    </>
  );
};

export default memo(MainLayout);
