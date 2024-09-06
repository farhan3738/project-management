import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';  
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import './SignUpForm.css';

function SignUpForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async (event) => {
    event.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      // Create a new user with email and password
      await createUserWithEmailAndPassword(auth, email, password);
      
      // Redirect to the sign-in page after successful sign-up
      navigate('/SignInForm');
    } catch (error) {
      console.error('Sign-up error code:', error.code);
      console.error('Sign-up error message:', error.message);
      setError('Error creating account. Please try again.');
    }
  };

  return (
    <div className="sign-up-form">
      <h1>Sign-Up</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSignUp}>
        <label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <Link to="/SignInForm"><span>Sign in</span></Link></p>  {/* Link added */}
    </div>
  );
};

export default SignUpForm;
