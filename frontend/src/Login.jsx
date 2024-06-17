import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/login', { email, password })
            .then(result => {
                if (result.data === "Success") {
                    localStorage.setItem("email",email)
                    setEmail('');
                    setPassword('');
                    navigate(`/home/`);
                } else {
                    setError(result.data);
                }
            })
            .catch(err => {
                setError('An error occurred. Please try again.');
            });
    };

    return (
        <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2>Login</h2>
                {error && <div className='alert alert-danger'>{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="Email">
                            <strong>Email</strong>
                        </label>
                        <input 
                            type="email" 
                            placeholder="Enter Your Email" 
                            autoComplete='off' 
                            name='Email' 
                            className='form-control rounded-0'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="Password">
                            <strong>Password</strong>
                        </label>
                        <input 
                            type="password" 
                            placeholder="Enter Your Password" 
                            autoComplete='off' 
                            name='Password' 
                            className='form-control rounded-0'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>
                    <button type="submit" className='btn btn-success w-100 rounded-0'>Login</button>
                </form>
                <p>Create New Account</p>
                <Link to="/register" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">Register</Link>
            </div>
        </div>
    );
}

export default Login;
