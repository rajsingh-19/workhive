import {useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signin } from "../../services/index";           // Importing the signin function to send form data to the backend
import styles from "./login.module.css";
import loginImage from "../../assets/login.png";
import lock from "../../assets/lock.svg";
import view from "../../assets/view.svg";
import { toast } from 'react-toastify';

const LoginPage = () => {
    const navigate = useNavigate();
    //               useState initializes the login data state with default empty values
    const [loginFormData, setLoginFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(true);

    //          states for handling the form errors
    const [errors, setErrors] = useState({});

    //      function for validating the form inputs by using regex
    const validateForm = () => {
        const errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        //      check if the email input is empty
        if (!loginFormData.email.trim()) {
            errors.email = "Email is required";
            //  check if the email format is correct
        } else if (!emailRegex.test(loginFormData.email)) {
            errors.email = "Invalid email format";
        }
        //      check if the password input is empty
        if (!loginFormData.password.trim()) {
            errors.password = "Password is required";
        }
        //      set the error state 
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    

    // Redirect to home if the user is already logged in (i.e., a token exists in localStorage)
    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) {
            navigate('/home');
        }
    }, []);
    
    //      Fucntion for user login
    const handleLogin = async (e) => {
        e.preventDefault();                     // Prevents the default form submission behavior (like refreshing the page)

        if (!validateForm()) return;

        try {
            const res = await signin(loginFormData);    // Calls the `signin` function with the form data
            if(res.status === 200) {                // Checks if the response status indicates success
                const data = await res.json();
                localStorage.setItem('token', data.token);      // Save token for later use

                // Reset form data after successful registration
                setLoginFormData({
                    email: '',
                    password: '',
                });

                toast.success("Logged in Successfully");
                navigate('/');
            } else {                                // Handles any errors by logging the response and showing an alert
                const errorData = await res.json();
                const errorMessage = errorData.message || "An error occurred";
                toast.error(errorMessage);  // Show the error message from the backend
            }
        } catch (error) {
            console.log(error);
            toast.error("An unexpected error occurred:", error);
        };
    };

    //              function for handle the sign up 
    const hanldeSignUp = () => {
        navigate('/register');
    }

    return (
        <div className="flex dir-row">
            <div className={`${styles.loginFormContainer} flex dir-col`}>
                <div className="firstSection">
                    <p className="dm-sans font-wt-700 text-30">Already have an account?</p>
                    <p className="dm-sans font-wt-500 text-19 text-grayClr">Your personal job finder is here</p>
                </div>
                <form onSubmit={handleLogin} className={`${styles.loginForm} flex dir-col`}>
                    {/* Form for user signn in */}
                    <div className={`${styles.inputContainer} flex dir-row justify-center align-center m-t-15`}>
                        <input className={`${styles.input} text-16 dm-sans font-wt-500 border-none outline-none`} type="email" name="email" value={loginFormData.email} placeholder="Email" onChange={(e) => setLoginFormData({...loginFormData, [e.target.name]: e.target.value})} />
                    </div>
                    {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}
                    <div className={`${styles.inputContainer} flex dir-row justify-center align-center m-t-15`}>
                        <img className={styles.inputIcons} src={lock} alt="lock icon" />
                        <input className={`${styles.passwordInput} text-16 dm-sans font-wt-500 border-none outline-none`}  type={showPassword ? "password" : "text"} name="password" value={loginFormData.password} placeholder="Password" onChange={(e) => setLoginFormData({...loginFormData, [e.target.name]: e.target.value})} />
                        <img className={`${styles.inputIcons} cursor-pointer`} src={view} alt="view icon" onClick={() => setShowPassword(!showPassword)} />
                    </div>
                    {errors.password && <p className={styles.errorMessage}>{errors.password}</p>}
                    <div>
                        <button type="submit" className="btn outline-none border-none font-wt-700 text-16 m-t-30 cursor-pointer">Sign in</button>
                    </div>
                </form>
                <div className={styles.lastLine}>
                    <span className="dm-sans font-wt-500 text-19 text-grayClr">Don't have an account?</span>&nbsp;&nbsp;
                    <button className={`dm-sans text-19 font-wt-500 underline ${styles.signupBtn} border-none cursor-pointer`} onClick={hanldeSignUp}>Sign Up</button>
                </div>
            </div>
            <div className={`${styles.loginImgContainer} position-relative`}>
                <p className={`${styles.onImgLine} dm-sans text-30 font-wt-500 text-white position-absolute`}>Your Personal Job Finder</p>
                <img src={loginImage} alt="login page image" className={styles.loginImg} />
            </div>
        </div>
    )
};

export default LoginPage;
