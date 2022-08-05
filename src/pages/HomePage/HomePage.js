import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import './HomePage.scss'

function HomePage() {
    const [locationInput, setLocationInput] = useState('');

    return (
        <div className='homepage'>
            <h1>home page</h1>
            <SearchBar 
                locationInput={locationInput} 
                setLocationInput={setLocationInput}
            />
        </div>
    );
}

export default HomePage;