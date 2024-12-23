import { useState } from "react";
import {register} from '../services/index';     // Importing the register function to send form data to the backend

const RegisterPage = () => {
    //              useState initializes the form data state with default empty values
    const [formData, setFormData] = useState({          
        name: '',
        email: '',
        mobile: '',
        password: ''
    });
    //               Function to handle form submission and register the user
    const handleRegisterUser = async (e) => {
        e.preventDefault();                         // Prevents the default form submission behavior (like refreshing the page)
        const res = await register(formData);       // Calls the `register` function with the form data
        if(res.status === 200) {                    // Checks if the response status indicates success
            setFormData({
                name: '',
                email: '',
                mobile: '',
                password: ''  
            });
            alert("Registered Successfully");   
        }
        else {                                      // Handles any errors by logging the response and showing an alert
            console.log(res); 
            alert("An error occurred");
        }
    }

    return (
        <div>
            {/* Form for user registration */}
            <form onSubmit={handleRegisterUser}>
                <input type="text" name='name' value={formData.name} placeholder="Name" onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})} />
                <input type="text" name='email' value={formData.email} placeholder="Email" onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})} />
                <input type="text" name='mobile' value={formData.mobile} placeholder="Mobile" onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})} />
                <input type="password" name='password' value={formData.password} placeholder="Password" onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})} />
                <button type='submit'>Create Account</button>
            </form>
        </div>
    )
};

export default RegisterPage;
