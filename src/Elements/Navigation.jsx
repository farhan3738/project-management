import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navigation.css';
import monogram from '../assets/monogram.jpg';

function Navigation() {
  const navigate = useNavigate();

  return (
    <div className="nav-bar">
      <nav className="custom-nav-bar">
        <div className="logo">
          <img src={monogram} alt="Logo" />
        </div>
        <div className="nav-buttons">
        <button className='button' onClick={() => navigate('/SignInForm')}>Sign in</button>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
