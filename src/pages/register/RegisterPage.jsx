import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from '../../services/index';
import styles from "../login/login.module.css";
import loginImage from "../../assets/login.png";
import lock from "../../assets/lock.svg";
import view from "../../assets/view.svg";


const RegisterPage = () => {
    const navigate = useNavigate();

    //              useState initializes the form data state with default empty values
    const [registerFormData, setRegisterFormData] = useState({          
        name: '',
        email: '',
        mobile: '',
        password: ''
    });

    const [showPassword, setShowPassword] = useState(true);
    const [checkboxChecked, setCheckboxChecked] = useState(false);

    //          states for handling the form errors
    const [errors, setErrors] = useState({});

    // Form validation logic
  const validateForm = () => {
    const validationErrors = {};

    if (!registerFormData.name.trim()) {
      validationErrors.name = "Name is required.";
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registerFormData.email)) {
      validationErrors.email = "Invalid email format.";
    };

    if(registerFormData.mobile.length < 10 ) {
        validationErrors.mobile = "Enter 10 digit mobile number.";
    };

    if (registerFormData.password.length < 8) {
      validationErrors.password = "Password must be at least 8 characters long.";
    };

    if (!checkboxChecked) {
        validationErrors.checkbox = "You must agree to the terms of use and privacy policy.";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

    //               Function to handle form submission and register the user
    const handleRegisterUser = async (e) => {
        e.preventDefault();                         // Prevents the default form submission behavior (like refreshing the page)

        if (!validateForm()) {
            return;
        };

        try {
            const res = await register(registerFormData);       // Calls the `register` function with the form data
            if(res.status === 201) {                    // Checks if the response status indicates success
                setRegisterFormData({
                    name: '',
                    email: '',
                    mobile: '',
                    password: ''  
                });
                alert("Registered Successfully");
                navigate('/login');  
            } else {                                      // Handles any errors by logging the response and showing an alert
                const errorData = await res.json();
                const errorMessage = errorData.message || "An error occurred";
                alert(errorMessage);  // Show the error message from the backend
            }
        } catch (error) {
            console.log(error);
            alert("An unexpected error occurred:", error);
        }
    };
    

    const handleSignIn = () => {
        navigate('/login');
    }

    return (
        <div className="flex dir-row">
            <div className={`${styles.loginFormContainer} flex dir-col`}>
                <div className="firstSection">
                    <p className="dm-sans font-wt-700 text-30">Create an account</p>
                    <p className="dm-sans font-wt-500 text-19 text-grayClr">Your personal job finder is here</p>
                </div>
                {/* Form for user registration */}
                <form onSubmit={handleRegisterUser} className={`${styles.loginForm} flex dir-col`}>
                    {/* Form for user register  */}
                    <div className={`${styles.inputContainer} flex dir-row justify-center align-center m-t-15`}>
                        <input className={`${styles.input} text-16 dm-sans font-wt-500 border-none outline-none`} type="text" name='name' value={registerFormData.name} placeholder="Name" onChange={(e) => setRegisterFormData({...registerFormData, [e.target.name]: e.target.value})} />
                    </div>
                    {errors.name && <p className={styles.errorMessage}>{errors.name}</p>}
                    <div className={`${styles.inputContainer} flex dir-row justify-center align-center m-t-15`}>
                        <input className={`${styles.input} text-16 dm-sans font-wt-500 border-none outline-none`} type="email" name='email' value={registerFormData.email} placeholder="Email" onChange={(e) => setRegisterFormData({...registerFormData, [e.target.name]: e.target.value})} />
                    </div>
                    {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}
                    <div className={`${styles.inputContainer} flex dir-row justify-center align-center m-t-15`}>
                        <input className={`${styles.input} text-16 dm-sans font-wt-500 border-none outline-none`} style={{ appearance: 'textfield', MozAppearance: 'textfield', WebkitAppearance: 'none' }} type="number" name='mobile' value={registerFormData.mobile} placeholder="Mobile" onChange={(e) => setRegisterFormData({...registerFormData, [e.target.name]: e.target.value})} />
                    </div>
                    {errors.mobile && <p className={styles.errorMessage}>{errors.mobile}</p>}
                    <div className={`${styles.inputContainer} flex dir-row justify-center align-center m-t-15`}>
                        <img className={styles.inputIcons} src={lock} alt="lock icon" />
                        <input className={`${styles.passwordInput} text-16 dm-sans font-wt-500 border-none outline-none`} type={showPassword ? "password" : "text"} name='password' value={registerFormData.password} placeholder="Password" onChange={(e) => setRegisterFormData({...registerFormData, [e.target.name]: e.target.value})} />
                        <img className={`${styles.inputIcons} cursor-pointer`} src={view} alt="view icon" onClick={() => setShowPassword(!showPassword)} />
                    </div>
                    {errors.password && <p className={styles.errorMessage}>{errors.password}</p>}
                    <div className="flex dir-row align-center m-t-15">
                        <input className={`${styles.checkbox} m-r-5`} type="checkbox" checked={checkboxChecked} onChange={(e) => setCheckboxChecked(e.target.checked)} />
                        <p className="text-grayClr">By creating an account, I agree to our terms of use and privacy policy</p>
                    </div>
                    {errors.checkbox && <p className={styles.errorMessage}>{errors.checkbox}</p>}
                    <div>
                        <button type="submit" className="btn outline-none border-none font-wt-700 text-16 m-t-30 cursor-pointer">Create Account</button>
                    </div>
                </form>
                <div className={styles.lastLine}>
                    <span className="dm-sans font-wt-500 text-19 text-grayClr">Already have an account?</span>&nbsp;&nbsp;
                    <button className={`dm-sans text-19 font-wt-500 underline ${styles.signupBtn} border-none cursor-pointer`} onClick={handleSignIn}>Sign In</button>
                </div>
            </div>
            <div className={`${styles.loginImgContainer} position-relative`}>           
                <p className={`${styles.onImgLine} dm-sans font-wt-500 text-white position-absolute`}>Your Personal Job Finder</p>
                <img src={loginImage} alt="login page image" className={styles.loginImg} />
            </div>
        </div>
    )
};

export default RegisterPage;
