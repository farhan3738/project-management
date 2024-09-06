import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './Elements/Navigation';
import HeroSec from './Elements/HeroSec';
import SignUpForm from './Elements/SignUpForm';
import SignInForm from './Elements/SignInForm';
import Dashboard from './Elements/Dashboard';

function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

function Main() {
  const location = useLocation();

  return (
    <>
      {location.pathname === '/' && <Navigation />} {/* Show Navigation only on the landing page */}
      <Routes>
        <Route path='/' element={<HeroSec />} />
        <Route path="/SignUpForm" element={<SignUpForm />} />
        <Route path="/SignInForm" element={<SignInForm />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
