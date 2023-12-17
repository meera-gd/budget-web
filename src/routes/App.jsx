import { useMutation } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Outlet, Navigate, useNavigate } from 'react-router-dom';

import AuthContext from '../contexts/AuthContext';

export default function App() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const logoutMutation = useMutation({
    mutationFn: () => logout(),
    onSuccess: () => navigate('/login'),
  });

  function handleLogout(e) {
    e.preventDefault();
    logoutMutation.mutate();
  }

  return (
    user
      ? (
        <>
          <button type="button" onClick={handleLogout}>Logout</button>
          <Outlet />
        </>
      )
      : <Navigate to="/login" />
  );
}
