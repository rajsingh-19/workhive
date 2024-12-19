import {useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {signin} from '../services/index';           // Importing the signin function to send form data to the backend
import loginImage from "../assets/login.png";
import "../styles/login.css";

const LoginPage = () => {
    const navigate = useNavigate();
    // Redirect to home if the user is already logged in (i.e., a token exists in localStorage)
    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) {
            navigate('/home');
        }
    }, []);         // Dependency array ensures this runs only once when the component mounts

    //               useState initializes the login data state with default empty values
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });
    //               Function to handle form submission and login the user
    const handleLogin = async (e) => {
        e.preventDefault();                     // Prevents the default form submission behavior (like refreshing the page)
        const res = await signin(loginData);    // Calls the `signin` function with the form data
        if(res.status === 200) {                // Checks if the response status indicates success
            const data = await res.json();
            localStorage.setItem('token', data.token);
            alert("Logged in Successfully");
            navigate('/home');
        } else {                                // Handles any errors by logging the response and showing an alert
            console.log(res);
            alert("An Error Occured");
        }
    };

    //              function for handle the sign up 
    const hanldeSignUp = () => {
        navigate('/register');
    }

    return (
        <div className="flex dir-row">
            <div className="loginFormContainer flex dir-col">
                <div className="firstSection">
                    <p className="dm-sans font-wt-700 text-30">Already have an account?</p>
                    <p className="dm-sans font-wt-500 text-19 text-grayClr">Your personal job finder is here</p>
                </div>
                <form onSubmit={handleLogin} className="loginForm flex dir-col">
                    {/* Form for user signn in */}
                    <div className="input-container">
                        <input className="dm-sans font-wt-500 input outline-none" type="text" name="email" value={loginData.email} placeholder="Email" onChange={(e) => setLoginData({...loginData, [e.target.name]: e.target.value})} />
                    </div>
                    <div className="input-container m-t-15">
                        <input className="dm-sans font-wt-500 input outline-none" type="text" name="password" value={loginData.password} placeholder="Password" onChange={(e) => setLoginData({...loginData, [e.target.name]: e.target.value})} />
                    </div>
                    <div>
                        <button type="submit" className="btn outline-none border-none font-wt-700 text-16 m-t-30 cursor-pointer">Sign in</button>
                    </div>
                </form>
                <div className="lastLine">
                    <span className="dm-sans font-wt-500 text-19 text-grayClr">Don't have an account?</span>&nbsp;&nbsp;
                    <button className="dm-sans text-19 font-wt-500 underline signup-btn border-none cursor-pointer" onClick={hanldeSignUp}>Sign Up</button>
                </div>
            </div>
            <div className="loginImgContainer position-relative">
                <p className="dm-sans font-wt-500 text-white onImgLine position-absolute">Your Personal Job Finder</p>
                <img src={loginImage} alt="login page image" className="loginImg" />
            </div>
        </div>
    )
};

export default LoginPage;
