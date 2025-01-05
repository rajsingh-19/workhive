import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./navbar.module.css";
import leftShape from "../../assets/leftShape.svg";
import rightShape from "../../assets/rightShape.svg";
import middleShape from "../../assets/middleShape.svg";

const Navbar = () => {
  const navigate = useNavigate();
  const [userStatus, setUserStatus] = useState(false);

  // Check if the user is logged in
  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem('token');
    if (isUserLoggedIn) {
      setUserStatus(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserStatus(false);
    navigate('/');
  }

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };
  
  return (
    <div className={`${styles.navbarContainer} position-relative flex dir-row justify-center`}>
        <img className={`${styles.leftShape} position-absolute`} src={leftShape} alt="left shape bg" />
        <img className={`${styles.middleShape} position-absolute`} src={middleShape} alt="middle shape bg" />
        <img className={`${styles.rightShape} position-absolute`} src={rightShape} alt="right shape bg" />
        <div className={`${styles.navContent} flex dir-row align-center position-absolute`}>
          <div className='flex dir-row'>
            <p className='dm-sans font-wt-700 text-24 text-white'>Jobfinder</p>
          </div>
          <div className='flex dir-row'>
            {
            userStatus ? (
              <div className='flex dir-row'>
                <button className='dm-sans font-wt-500 text-white text-22 border-none bg-transparent outline-none m-r-20 cursor-pointer' onClick={handleLogout}>Logout</button>
                <p className='dm-sans font-wt-500 text-22 text-white'>Hello! Recruiter</p>
              </div>
            ) : (
              <div className='flex dir-row'>
                <button className={`${styles.loginBtn} dm-sans font-wt-500 text-white text-20 bg-transparent outline-none m-r-20 cursor-pointer`} onClick={handleLogin}>Login</button>
                <button className={`${styles.registerBtn} dm-sans font-wt-500 text-white text-20 border-none bg-transparent outline-none m-r-20 cursor-pointer`} onClick={handleRegister}>Register</button>
              </div>
            )
            }
          </div>
        </div>
    </div>
  )
}

export default Navbar;
