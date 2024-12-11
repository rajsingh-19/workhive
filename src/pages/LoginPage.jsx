import { useEffect, useState } from "react";
import {signin} from '../services/index';           // Importing the signin function to send form data to the backend
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) {
            navigate('/home');
        }
    }, []);

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
            // console.log(data);
            localStorage.setItem('token', data.token);
            alert("Logged in Successfully");
            navigate('/home');
        } else {                                // Handles any errors by logging the response and showing an alert
            console.log(res);
            alert("An Error Occured");
        }
    };

    return (
        <form onSubmit={handleLogin}>
            {/* Form for user signn in */}
            <input type="text" name="email" value={loginData.email} placeholder="Email" onChange={(e) => setLoginData({...loginData, [e.target.name]: e.target.value})} />
            <input type="text" name="password" value={loginData.password} placeholder="Password" onChange={(e) => setLoginData({...loginData, [e.target.name]: e.target.value})} />
            <button type="submit">Sign in</button>
        </form>
    )
};

export default LoginPage;
