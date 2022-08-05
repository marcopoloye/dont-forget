import './SearchBar.scss';
import axios from 'axios';
import React, { useState} from 'react';
import { Link } from 'react-router-dom';


function SearchBar({locationInputText, setLocationInputText}) {
    const [weatherData, setWeatherData] = useState('');

    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

    const handleInput = (e) => {
        setLocationInputText(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const searchValue = e.target[0].value;

        if (searchValue) {
            axios
                .get (`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=${API_KEY}`)
                .then (response => {
                    const temperature = Math.round((response.data.main.temp) - 273.15);
                    const city = response.data.name;
                    const country = response.data.sys.country;
                    setWeatherData(`It is currently ${temperature} °C in ${city}, ${country}`);
                    console.log(response.data.id)
                })
                .catch ((error) => {
                    console.log('Error getting destination', error);
                });

            setLocationInputText('');
        }
    }


    return (
        <div className="search__container">
            <h3>{weatherData}</h3>
                
            <form onSubmit={handleSubmit}>
                <input className="search__input" type="text" placeholder='Enter a location' value={locationInputText} onChange={handleInput}/>
                <button className="search__button" type="submit">Search</button>
            </form>
        </div>
    );
}

export default SearchBar;