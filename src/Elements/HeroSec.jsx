import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './HeroSec.css';
import hero from '../assets/hero.jpg';

function HeroSec() {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  return (
    <div className="content-section">
      <div className="text-content">
        <h1>COUNTDOWN BOARD FOR PROJECT MANAGEMENT</h1> 
        <p>Our project management platform brings everything together in one place. Work seamlessly with your team, no matter where they are. Share updates, assign tasks, and communicate effortlessly. Keep your projects on track with customizable task boards and prioritization tools. Never miss a deadline again.</p>  
        <button className='button' onClick={() => navigate('/SignUpForm')}>
          Get Started
        </button>
      </div> 
      <div className="image-content">
        <img src={hero} alt="Loading..." />
      </div>
    </div>
  );
}

export default HeroSec;
