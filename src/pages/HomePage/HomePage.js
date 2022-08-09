import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import './HomePage.scss';
import logo from '../../assets/logo.svg';
import Footer from '../../components/Footer/Footer';
import { useMediaQuery } from 'react-responsive';

function HomePage() {
    const [locationInput, setLocationInput] = useState('');
    const tablet = useMediaQuery({ query: '(min-width: 768px)'})

    return (
        <div className='homepage'>
            <div className='homepage__logo-container'>
                <img src={logo} className='homepage__logo'/>
            </div>
            <label></label>
            <SearchBar 
                locationInput={locationInput} 
                setLocationInput={setLocationInput}
            />
            {tablet && <Footer/>}
        </div>
    );
}

export default HomePage;