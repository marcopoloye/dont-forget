import './SignUpPage.scss';
import axios from "axios";
import { useState } from "react";
import { API_URL } from '../../config/index';
import { Link } from 'react-router-dom';

function SignUpPage () {
    const [firstNameInput, setFirstNameInput] = useState('');
    const [lastNameInput, setLastNameInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [success, setSuccess] = useState('');

    // displays current input
    const handleFirstNameInput = (e) => {
        setFirstNameInput(e.target.value);
    };
    const handleLastNameInput = (e) => {
        setLastNameInput(e.target.value);
    };
    const handleEmailInput = (e) => {
        setEmailInput(e.target.value);
    };
    const handlePasswordInput = (e) => {
        setPasswordInput(e.target.value);
    };

    // submits current input fields to sign up and checks for empty fields
    const handleSubmit = (e) => {
        e.preventDefault();

        for (let i=0; i < 4; i++) {
            const inputs = e.target[i].value;

            if (!inputs) {
                e.target[i].nextSibling.classList.remove('signup__missing--hidden');
                e.target[i].nextSibling.classList.add('signup__missing');
            } else {
                e.target[i].nextSibling.classList.add('signup__missing--hidden');
            };
        };

        if (e.target[0].value && e.target[1].value && e.target[2].value && e.target[3].value) {
            axios.post(`${API_URL}/register`, {
                firstName: e.target[0].value,
                lastName: e.target[1].value,
                email: e.target[2].value,
                password: e.target[3].value
            })
            .catch (error => {
                console.log('Error signing up', error);
            });
            
            setFirstNameInput('');
            setLastNameInput('');
            setEmailInput('');
            setPasswordInput('');
            setSuccess('Sign up successful! Click here to return to login');
        } else {
            console.log('empty form inputs');
        };
    };

    return (
        <div className="signup">
            <h1 className="signup__heading" htmlFor='signup-form'>
                Sign up for an account
            </h1>
            <form className="signup__form" id='signup-form' onSubmit={handleSubmit}>
                <label className="signup__label" htmlFor='signup-firstname'>
                    First Name:
                </label>
                <input 
                    type='text' 
                    id='signup-firstname' 
                    value={firstNameInput} 
                    onChange={handleFirstNameInput}
                    className='signup__input input'
                    placeholder='Enter your first name'
                />
                <label className='signup__missing--hidden' id='error'>
                    Please enter a first name
                </label>

                <label className="signup__label" htmlFor='signup-lastname'>
                    Last Name:
                </label>
                <input 
                    type='text' 
                    id='signup-lastname' 
                    value={lastNameInput} 
                    onChange={handleLastNameInput}
                    className='signup__input input'
                    placeholder='Enter your last name'
                />
                <label className='signup__missing--hidden' id='error'>
                    Please enter a last name
                </label>

                <label className="signup__label" htmlFor='signup-email'>
                    Email:
                </label>
                <input 
                    type='text' 
                    id='signup-email' 
                    value={emailInput} 
                    onChange={handleEmailInput}
                    className='signup__input input'
                    placeholder='Enter your email'
                />
                <label className='signup__missing--hidden' id='error'>
                    Please enter an email
                </label>

                <label className="signup__label" htmlFor='signup-password'>
                    Password:
                </label>
                <input 
                    type='password' 
                    id='signup-password' 
                    value={passwordInput} 
                    onChange={handlePasswordInput}
                    className='signup__input input'
                    placeholder='Enter your password'
                />
                <label className='signup__missing--hidden' id='error'>
                    Please enter a password
                </label>

                <button className="signup__button button">
                    Sign up
                </button>
                <p className='signup__success'>
                    <Link to='/login' className='signup__success'>{success}</Link>
                </p>
            </form>
        </div>
    );
};

export default SignUpPage;