import { React, useState, useEffect } from 'react';
import { signup, login, deleteProfile } from '../services/authService';
import jwtDecode from 'jwt-decode';

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
      setMessage(error.response.data.error);
    }
  }

  async function handleLogin(event) {
    event.preventDefault();
    try {
      await login({ email: loginEmail, password: loginPassword });
      setIsLoggedIn(true);
      setUserEmail(loginEmail);
      localStorage.setItem('userEmail', loginEmail);
      setMessage('');
    } catch (error) {
      setMessage(error.response.data.error);
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
      // Decode the token and check its expiration time
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 > Date.now()) {
        // Token is still valid
        setIsLoggedIn(true);
        setUserEmail(localStorage.getItem('userEmail')); // retrieve user email from local storage
      } else {
        // Token has expired, reset state
        setIsLoggedIn(false);
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
      }
    }
  }, []);
  

  return (
    <div id='profile-div'>
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
          <div className='logout-delete'>
            <p>User: {userEmail}</p>
            <button onClick={() => handleLogout()}>Log Out</button>
            <button onClick={() => handleDeleteProfile()}>Delete Profile</button>
          </div>
        </>
      )}
      <p>{message}</p>
    </div>
  );
}
