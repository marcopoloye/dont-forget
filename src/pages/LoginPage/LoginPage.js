import './LoginPage.scss';
import React, { useState} from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

function LoginPage() {
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false)

    const handleEmailInput = (e) => {
        setEmailInput(e.target.value);
    };

    const handlePasswordInput = (e) => {
        setPasswordInput(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (e.target[0].value && e.target[1].value) {
            axios
                .post(`http://localhost:8080/login`, {
                    email: e.target[0].value,
                    password: e.target[1].value
                })
                .then(res => {
                    sessionStorage.setItem('authToken', res.data.token);
                    setError('');
                    setSuccess(true);
                })
                .catch(err => {
                    setError(err.response.data);
                    setSuccess(false);
                })
        } else {
            console.log('empty form inputs');
        }
    };

    return (
      <div className='login'>
        <h2 htmlFor='login-form' className='login__heading'>Login</h2>
        <form className="login__form" id='login-form' onSubmit={handleSubmit}>
            <label htmlFor='login-email' className='login__label'>
                Email:
            </label>
            <input 
                className='login__input input' 
                type='text' 
                id='login-email' 
                value={emailInput} 
                onChange={handleEmailInput}
            />
            <label htmlFor='login-password' className='login__label'>
                Password:
            </label>
            <input 
                className='login__input input' 
                type='password' 
                id='login-password' 
                value={passwordInput} 
                onChange={handlePasswordInput}
            />
            <button className='login__button button'>Login</button>
            {success ? <Redirect to='/'/> : ''}
        </form>
        <Link to='/signup' className='login__link'>
            Don't have an account? Click here to sign up
        </Link>
      </div>  
    );
}

export default LoginPage;