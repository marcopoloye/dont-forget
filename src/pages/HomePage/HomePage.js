import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import './HomePage.scss'
// import SuggestForm from '../../components/SuggestForm/SuggestForm';
import Checklist from '../../components/Checklist/Checklist';
import ChecklistForm from '../../components/ChecklistForm/ChecklistForm';

function HomePage() {

    const [inputText, setinputText] = useState('')

    return (
        <div className='homepage'>
            <h1>home page</h1>
            <SearchBar/>
            
            <ChecklistForm />
            <Checklist />
        </div>
    );
}

export default HomePage;