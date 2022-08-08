import './ListPage.scss';
import React, {useState, useEffect} from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import SignupForm from '../../components/SignupForm/SignupForm';

function ListPage() {

    
    return (
        <>
            <h1>List page</h1>
            <LoginForm/>
            <SignupForm/>
        </>
    );
}

export default ListPage;
