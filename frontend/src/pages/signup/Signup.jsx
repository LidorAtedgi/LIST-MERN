import React, { useState } from "react";
import "./Signup.css";
import { Link } from 'react-router-dom';
import useSignup from "../../hooks/useSignup";
import GoogleButton from "../../components/googleButton/GoogleButton";

function Signup() {
    const [inputs, setInputs] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });
    const { loading, signup } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(inputs);
    }

    return (
        <div className="signup-wrapper">
            <div className="signup-container">
                <h2 className="signup-title">Create Account</h2>

                <form className="signup-form" onSubmit={handleSubmit}>
                    <div className="signup-field">
                        <label>Username</label>
                        <input 
                            type="text" 
                            placeholder="Choose username" 
                            value={inputs.username} 
                            onChange={(e) => setInputs({...inputs, username: e.target.value})}
                        />
                    </div>

                    <div className="signup-field">
                        <label>Password</label>
                        <input 
                            type="password" 
                            placeholder="Create password" 
                            value={inputs.password} 
                            onChange={(e) => setInputs({...inputs, password: e.target.value})}
                        />
                    </div>

                    <div className="signup-field">
                        <label>Confirm Password</label>
                        <input 
                            type="password" 
                            placeholder="Confirm password" 
                            value={inputs.confirmPassword} 
                            onChange={(e) => setInputs({...inputs, confirmPassword: e.target.value})}
                        />
                    </div>

                    <Link to='/login' className="signup-link">Already have an account?</Link>
                     <a href="/privacy-policy" target="_blank" rel="noreferrer">
                      Privacy Policy
                     </a>

                    <button className="signup-btn" disabled={loading}>
                        {loading ? <div className='spinner'></div> : "Sign Up"}
                    </button>
                </form>

                  <GoogleButton/>

            </div>
        </div>
    );
}

export default Signup;
