import { useMutation } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import AuthContext from '../contexts/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const emailValid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email);
  const passwordValid = /^.{6,4096}$/.test(password);
  const formValid = emailValid && passwordValid;

  const submitMutation = useMutation({
    mutationFn: () => login(email, password),
    onSuccess: () => navigate('/'),
  });

  function handleSubmit(e) {
    e.preventDefault();
    submitMutation.mutate();
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="username"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            autoComplete="current-password"
            minLength="6"
            maxLength="4096"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label htmlFor="show-password">
          Show password
          <input
            type="checkbox"
            id="show-password"
            name="show-password"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
        </label>
        <button type="submit" disabled={!formValid}>Log In</button>
      </form>
      {'Don\'t have an account yet? '}
      <Link to="/signup">Sign Up</Link>
    </>
  );
}
