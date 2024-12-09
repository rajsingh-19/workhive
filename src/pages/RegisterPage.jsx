import { useState } from "react";
import {register} from '../services/index';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        password: ''
    });
    //      function for registering the user
    const handleRegisterUser = async (e) => {
        e.preventDefault();
        const res = await register(formData);
        if(res.status === 200) {
            alert("User Registered Succesfully");
        }
        else {
            console.log(res);
            alert("An error occurred");
        }
    }

    return (
        <div>
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
