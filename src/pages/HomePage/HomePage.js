import React, {Component} from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import './HomePage.scss'

function HomePage() {
    return (
        <div className='homepage'>
            <SearchBar />
        </div>
    );
}

export default HomePage;