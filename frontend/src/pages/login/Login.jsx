import React, { useState } from 'react'
import "./Login.css"
import { Link } from 'react-router-dom'
import useLogin from '../../hooks/useLogin';
import GoogleButton from '../../components/googleButton/GoogleButton';

function Login() {
    const [inputs, setInputs] = useState({
        username: '',
        password: '',
    });

    const {loading, login} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(inputs);
    }

    return (
        <div className="login-wrapper">
            <div className="login-container">
                <h2 className="login-title">Welcome Back</h2>

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="login-field">
                        <label>Username</label>
                        <input 
                            type="text" 
                            placeholder="Enter username" 
                            value={inputs.username} 
                            onChange={(e) => setInputs({...inputs, username: e.target.value})}
                        />
                    </div>

                    <div className="login-field">
                        <label>Password</label>
                        <input 
                            type="password" 
                            placeholder="Enter password" 
                            value={inputs.password} 
                            onChange={(e) => setInputs({...inputs, password: e.target.value})}
                        />
                    </div>

                    <Link to='/signup' className="login-link">Don't have an account?</Link>

                    <button className="login-btn" disabled={loading}>
                        {loading ? <div className='spinner'></div> : "Login"}
                    </button>
                </form>
                      <GoogleButton/>
            </div>
        </div>
    )
}

export default Login