import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import './HomePage.scss';
import logo from '../../assets/icons/logo.svg';

function HomePage() {
    const [locationInput, setLocationInput] = useState('');

    return (
        <div className='homepage'>
            <div className='homepage__logo-container'>
                <img src={logo} className='homepage__logo'/>
            </div>
            <SearchBar 
                locationInput={locationInput} 
                setLocationInput={setLocationInput}
            />
        </div>
    );
}

export default HomePage;