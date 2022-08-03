import React, {Component} from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import './HomePage.scss'
import SuggestForm from '../../components/SuggestForm/SuggestForm';

function HomePage() {
    return (
        <div className='homepage'>
            <SearchBar />
        </div>
    );
}

export default HomePage;