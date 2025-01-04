import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLoginPage = () => {
    navigate('/login');
  };

  const handleRegisterPage = () => {
    navigate('/register');
  };
  
  return (
    <div>
        <p>Jobfinder</p>
        <div>
            <button onClick={handleLoginPage}>Login</button>
            <button onClick={handleRegisterPage}>Register</button>
        </div>
        <div>
            <button>Logout</button>
            <p>Hello! Recruiter</p>
        </div>
    </div>
  )
}

export default Navbar;
