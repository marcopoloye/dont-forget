import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import './HomePage.scss'
// import SuggestForm from '../../components/SuggestForm/SuggestForm';
import Checklist from '../../components/Checklist/Checklist';

function HomePage() {

    return (
        <div className='homepage'>
            <h1>home page</h1>
            <SearchBar/>
            <Checklist />
        </div>
    );
}

export default HomePage;