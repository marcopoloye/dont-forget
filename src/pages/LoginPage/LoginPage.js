import './LoginPage.scss';
import React, { useState} from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

function LoginPage() {
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [success, setSuccess] = useState(false)

    const handleEmailInput = (e) => {
        setEmailInput(e.target.value);
    };

    const handlePasswordInput = (e) => {
        setPasswordInput(e.target.value);
    };

    const handleLogin = (e) => {
        e.preventDefault();

        for (let i=0; i < 2; i++) {
            const inputs = e.target[i].value;

            if (!inputs) {
                e.target[i].nextSibling.classList.remove('login__missing--hidden')
                e.target[i].nextSibling.classList.add('login__missing')
            } else {
                e.target[i].nextSibling.classList.add('login__missing--hidden')
            }
        }

        if (e.target[0].value && e.target[1].value) {
            axios
                .post(`http://localhost:8080/login`, {
                    email: e.target[0].value,
                    password: e.target[1].value
                })
                .then(res => {
                    sessionStorage.setItem('authToken', res.data.token);
                    const token = sessionStorage.getItem('authToken')
                    setSuccess(true);
                    console.log(res.data)
                    
                    axios
                        .get('http://localhost:8080/current', {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        })
                        .then(res => {
                            const stringifiedEmail = JSON.stringify(res.data.email);
                            console.log(stringifiedEmail)
                            sessionStorage.setItem('currentEmail', stringifiedEmail);
                        })
                        .catch(err => {
                            console.log(err)
                        });
                })
                .catch(err => {
                    setSuccess(false);
                })
        } else {
            console.log('empty form inputs');
        }
    };

    return (
      <div className='login'>
        <h1 htmlFor='login-form' className='login__heading'>Login</h1>
        <form className="login__form" id='login-form' onSubmit={handleLogin}>
            <label htmlFor='login-email' className='login__label'>
                Email:
            </label>
            <input 
                className='login__input input' 
                type='text' 
                id='login-email' 
                value={emailInput} 
                onChange={handleEmailInput}
                placeholder='Enter your email'
            />
            <label className='login__missing--hidden' id='error'>Please enter an email</label>
            <label htmlFor='login-password' className='login__label'>
                Password:
            </label>
            <input 
                className='login__input input' 
                type='password' 
                id='login-password' 
                value={passwordInput} 
                onChange={handlePasswordInput}
                placeholder='Enter your password'
            />
            <label className='login__missing--hidden' id='error'>Please enter a password</label>
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