import './SearchBar.scss';
import '../../styles/partials/_buttons.scss';
import axios from 'axios';
import React, { useState} from 'react';
import ChecklistForm from '../ChecklistForm/ChecklistForm';
import ChecklistList from '../ChecklistList/ChecklistList';

function SearchBar({locationInput, setLocationInput}) {
    const [inputText, setInputText] = useState('');
    const [items, setItems] = useState([]);
    const [weatherData, setWeatherData] = useState('');


    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

    const handleInput = (e) => {
        setLocationInput(e.target.value);
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
                    
                    if (`${temperature}` >= 20) {
                        axios
                        .get (`http://localhost:8080/summer-items`)
                        .then (response => {
                            const itemsList = response.data
                            setItems(itemsList)
                        })
                        .catch ((error) => {
                            console.log('Error getting items', error);
                        });
                    } else if (`${temperature}` < 20 && `${temperature}` > 14) {
                        axios
                        .get (`http://localhost:8080/spring-items`)
                        .then (response => {
                            const itemsList = response.data
                            setItems(itemsList)
                        })
                        .catch ((error) => {
                            console.log('Error getting items', error);
                        });
                    } else if (`${temperature}` <= 14 && `${temperature}` > 9) {
                        axios
                        .get (`http://localhost:8080/fall-items`)
                        .then (response => {
                            const itemsList = response.data
                            setItems(itemsList)
                        })
                        .catch ((error) => {
                            console.log('Error getting items', error);
                        });
                    } else if (`${temperature}` <= 9){
                        axios
                        .get (`http://localhost:8080/winter-items`)
                        .then (response => {
                            const itemsList = response.data
                            setItems(itemsList)
                        })
                        .catch ((error) => {
                            console.log('Error getting items', error);
                        });
                    }
                })
                .catch ((error) => {
                    console.log('Error getting destination', error);
                });

            setLocationInput('');


        }
    }


    return (
        <>
            <div className="search__container">
                <h3>{weatherData}</h3>
                    
                <form onSubmit={handleSubmit}>
                    <input className="search__input" type="text" placeholder='Enter a location' value={locationInput} onChange={handleInput}/>
                    <button className="search__button button" type="submit">Search</button>
                </form>
            </div>
               
            <ChecklistForm 
                inputText={inputText} 
                setInputText={setInputText} 
                items={items} 
                setItems={setItems} 
                weatherData={weatherData}
            />
            
            <ChecklistList 
                items={items} 
                setItems={setItems}
            />

            <button className={`${weatherData ? 'search__button-save button' : 'button--hidden'}`}>Save to my List</button>
        </>

    );
}

export default SearchBar;