import React, { useState } from 'react';
import { signup, login } from '../services/authService';

export function ProfilePage() {

    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [message, setMessage] = useState('');

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
          setMessage('User logged in successfully!');
        } catch (error) {
          setMessage(error.response.data.error); // display the error message
        }
      }
      
      
    
      return (
        <div>
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
          <p>{message}</p>
      
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
          <p>{message}</p>
        </div>
      );
      
}