// ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { signup, login, deleteProfile } from '../services/authService';

export function ProfilePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [message, setMessage] = useState('');
  const [userEmail, setUserEmail] = useState('');

  async function handleSignup(event) {
    event.preventDefault();
    try {
      await signup({ email: signupEmail, password: signupPassword });
      setMessage('User created successfully!');
    } catch (error) {
      setMessage(error.response.data.error); // display the error message
    }
  }

  async function handleLogin(event) {
    event.preventDefault();
    try {
      await login({ email: loginEmail, password: loginPassword });
      setIsLoggedIn(true);
      setUserEmail(loginEmail);
      localStorage.setItem('userEmail', loginEmail);
      setMessage(''); // clear the message
    } catch (error) {
      setMessage(error.response.data.error); // display the error message
    }
  }
  

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail'); // remove user email from local storage
    setIsLoggedIn(false);
  };

  const handleDeleteProfile = async () => {
    try {
      await deleteProfile();
      localStorage.removeItem('token');
      localStorage.removeItem('userEmail'); // remove user email from local storage
      setIsLoggedIn(false);
    } catch (error) {
      console.error(error);
    }
  };
  

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      setUserEmail(localStorage.getItem('userEmail')); // retrieve user email from local storage
    }
  }, []);
  

  return (
    <div>
      {!isLoggedIn && (
        <>
          <h4>Sign Up</h4>
          <form onSubmit={handleSignup}>
            <input
              type="email"
              value={signupEmail}
              onChange={event => setSignupEmail(event.target.value)}
              placeholder="Email"
              required
            />
            <input
              type="password"
              value={signupPassword}
              onChange={event => setSignupPassword(event.target.value)}
              placeholder="Password"
              required
            />
            <button type="submit">Sign Up</button>
          </form>

          <h4>Log In</h4>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              value={loginEmail}
              onChange={event => setLoginEmail(event.target.value)}
              placeholder="Email"
              required
            />
            <input
              type="password"
              value={loginPassword}
              onChange={event => setLoginPassword(event.target.value)}
              placeholder="Password"
              required
            />
            <button type="submit">Log In</button>
          </form>
        </>
      )}
      {isLoggedIn && (
        <>
          <p>User email: {userEmail}</p>
          <button onClick={() => handleLogout()}>Log Out</button>
          <button onClick={() => handleDeleteProfile()}>Delete Profile</button>
        </>
      )}
      <p>{message}</p>
    </div>
  );
}
