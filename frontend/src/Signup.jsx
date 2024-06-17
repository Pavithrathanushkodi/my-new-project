import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [projectName, setProjectName] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        console.log(e)
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/register', {
                name,
                email,
                companyName,
                projectName,
                role,
                password
            });
            if (response.data === "Email already registered") {
                setError("Email already registered");
            } else if (response.data === "Registration successful") {
                setName('');
                setEmail('');
                setCompanyName('');
                setProjectName('');
                setRole('');
                setPassword('');
                navigate('/login');
            } else {
                setError("An unexpected error occurred.");
            }
        } catch (error) {
            setError("An error occurred. Please try again.");
        }
    }

    return (
        <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
            <div className='bg-white p-3 rounded w-50'>
                <h2>Register</h2>
                {error && <div className='alert alert-danger'>{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="name"><strong>Name</strong></label>
                        <input
                            type='text'
                            placeholder='Enter Your Name'
                            autoComplete='off'
                            name='name'
                            className='form-control rounded-0'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='email'><strong>Email</strong></label>
                        <input
                            type='email'
                            placeholder='Enter Your Email'
                            autoComplete='off'
                            name='email'
                            className='form-control rounded-0'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='companyName'><strong>Company Name</strong></label>
                        <input
                            type='text'
                            placeholder='Enter Your Company Name'
                            autoComplete='off'
                            name='companyName'
                            className='form-control rounded-0'
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='projectName'><strong>Project Name</strong></label>
                        <input
                            type='text'
                            placeholder='Enter Your Project Name'
                            autoComplete='off'
                            name='projectName'
                            className='form-control rounded-0'
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='role'><strong>Your Role</strong></label>
                        <input
                            type='text'
                            placeholder='Enter Your Role'
                            autoComplete='off'
                            name='role'
                            className='form-control rounded-0'
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password'><strong>Password</strong></label>
                        <input
                            type='password'
                            placeholder='Enter Your Password'
                            autoComplete='off'
                            name='password'
                            className='form-control rounded-0'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0'>Register</button>
                </form>
                <p>Already have an account? <Link to='/login' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Login</Link></p>
            </div>
        </div>
    );
}

export default Signup;
