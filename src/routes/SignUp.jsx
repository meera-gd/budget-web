import { useMutation } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import AuthContext from '../contexts/AuthContext';

export default function SignUp() {
  const navigate = useNavigate();
  const { signUp } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);
  const [showAccountExistsMessage, setShowAccountExistsMessage] = useState(false);

  const emailValid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email);
  const passwordValid = /^(?=.*[A-Z)(?=.*[a-z)(?=.*[0-9]).{6,4096}$/.test(password);
  const formValid = emailValid && passwordValid;

  const submitMutation = useMutation({
    mutationFn: () => signUp(email, password),
    onSuccess: () => navigate('/login'),
    onError: (err) => {
      if (err.code === 'auth/email-already-in-use') setShowAccountExistsMessage(true);
    },
  });

  function handleEmailChanged(e) {
    setEmail(e.target.value);
    setShowAccountExistsMessage(false);
  }

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
            autoComplete="email"
            onChange={handleEmailChanged}
            required
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            autoComplete="new-password"
            minLength="6"
            maxLength="4096"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          At least 1 uppercase letter
          At least 1 lowercase letter
          At least 1 number
          At least 6 characters
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
        <label htmlFor="confirm-password">
          Confirm Password
          <input
            type={showConfirmedPassword ? 'text' : 'password'}
            id="confirm-password"
            name="confirm-password"
            autoComplete="new-password"
            onChange={(e) => setConfirmedPassword(e.target.value)}
            required
          />
          {password !== confirmedPassword ? 'Passwords must match' : null}
        </label>
        <label htmlFor="show-confirm-password">
          Show password
          <input
            type="checkbox"
            id="show-confirm-password"
            name="show-confirm-password"
            checked={showConfirmedPassword}
            onChange={() => setShowConfirmedPassword(!showConfirmedPassword)}
          />
        </label>
        <button type="submit" disabled={!formValid}>Sign Up</button>
      </form>
      {showAccountExistsMessage ? 'Account with that email already exists' : null}
      Already have an account?
      {' '}
      <Link to="/login">Log In</Link>
    </>
  );
}
