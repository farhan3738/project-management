import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import './SignInForm.css';

function SignInForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      // Sign in the user with email and password
      await signInWithEmailAndPassword(auth, email, password);
      
      // Redirect to the Management Page after successful sign-in
      navigate('/Dashboard');
    } catch (error) {
      console.error('Sign-in error code:', error.code);
      console.error('Sign-in error message:', error.message);
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="sign-in-form">
      <h1>Sign-In</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSignIn}>
        <label>
          <input
            type="email"
            name="email"
            placeholder='Enter your email'
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
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Sign In</button>
      </form>
      <p>Don't have an account? <Link to="/SignUpForm"><span>Sign up</span></Link></p>  {/* Updated the Link here */}
    </div>
  );
};

export default SignInForm;
