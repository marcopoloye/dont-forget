import axios from "axios";
import React, { useState} from 'react';

function SignupForm () {
    const [firstNameInput, setFirstNameInput] = useState('');
    const [lastNameInput, setLastNameInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');

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

    
    const handleSubmit = (e) => {
        e.preventDefault();

        if (e.target[0].value && e.target[1].value && e.target[2].value && e.target[3].value) {
            axios
                .post(`http://localhost:8080/register`, {
                    firstName: e.target[0].value,
                    lastName: e.target[1].value,
                    email: e.target[2].value,
                    password: e.target[3].value
                })
                .catch (error => {
                    console.log('Error getting signing up', error);
                });
        } else {
            console.log('empty form inputs');
        };
        setFirstNameInput('');
        setLastNameInput('');
        setEmailInput('');
        setPasswordInput('');
    };

    return (
        <>
            <label htmlFor='signup-form'>Sign up for an account</label>
            <form id='signup-form' onSubmit={handleSubmit}>
                <label htmlFor='signup-firstname'>First Name</label>
                <input 
                    type='text' 
                    id='signup-firstname' 
                    value={firstNameInput} 
                    onChange={handleFirstNameInput}
                />
                <label htmlFor='signup-lastname'>Last Name</label>
                <input 
                    type='text' 
                    id='signup-lastname' 
                    value={lastNameInput} 
                    onChange={handleLastNameInput}
                />
                <label htmlFor='signup-email'>Email</label>
                <input 
                    type='text' 
                    id='signup-email' 
                    value={emailInput} 
                    onChange={handleEmailInput}
                />
                <label htmlFor='signup-password'>Password</label>
                <input 
                    type='password' 
                    id='signup-password' 
                    value={passwordInput} 
                    onChange={handlePasswordInput}
                />
                <button>Sign up</button>
            </form>
        </>
    );
}

export default SignupForm ;