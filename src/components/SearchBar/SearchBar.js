import './SearchBar.scss';
import axios from 'axios';
import React, { useState} from 'react';
import ChecklistForm from '../ChecklistForm/ChecklistForm';
import ChecklistList from '../ChecklistList/ChecklistList';
import { API_URL } from '../../config/index';

function SearchBar({locationInput, setLocationInput}) {
    const [inputText, setInputText] = useState('');
    const [items, setItems] = useState([]);
    const [weatherData, setWeatherData] = useState('');
    const [saveSuccess, setSaveSuccess] = useState('');
    const [weatherLink, setWeatherLink] = useState('');
    const [searchError, setSearchError] = useState('');

    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

    // displays current input
    const handleSearchInput = (e) => {
        setLocationInput(e.target.value);
    };

    // adds current input field to list
    const handleSearchSubmit = (e) => {
        e.preventDefault();

        const searchValue = e.target[0].value;

        // checks for empty input field
        if (searchValue) {
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=${API_KEY}`)
                .then(res => {
                    const temperature = Math.round((res.data.main.temp) - 273.15);
                    const city = res.data.name;
                    const country = res.data.sys.country;
                    const destination = (`${city}, ${country}`);
                    const destinationId = res.data.id;

                    sessionStorage.setItem('currentDestination', destination);

                    setWeatherLink(`https://openweathermap.org/city/${destinationId}`);
                    setWeatherData(`It is currently ${temperature} °C in ${destination}. Click here for more details.`);
                    setSearchError('')

                    if (`${temperature}` >= 20) {
                        axios.get(`${API_URL}/summer-items`)
                            .then(res => {
                                const itemsList = res.data;

                                setItems(itemsList);
                            })
                            .catch(err => {
                                console.log('Error getting items', err);
                            });
                    } else if (`${temperature}` < 20 && `${temperature}` > 14) {
                        axios.get(`${API_URL}/spring-items`)
                            .then(res => {
                                const itemsList = res.data;

                                setItems(itemsList);
                            })
                            .catch(err => {
                                console.log('Error getting items', err);
                            });
                    } else if (`${temperature}` <= 14 && `${temperature}` > 9) {
                        axios.get(`${API_URL}/fall-items`)
                            .then(res => {
                                const itemsList = res.data;

                                setItems(itemsList);
                            })
                            .catch(err => {
                                console.log('Error getting items', err);
                            });
                    } else if (`${temperature}` <= 9) {
                        axios.get(`${API_URL}/winter-items`)
                            .then(res => {
                                const itemsList = res.data;

                                setItems(itemsList);
                            })
                            .catch(err => {
                                console.log('Error getting items', err);
                            });
                   }
                })
                .catch (err => {
                    console.log('Error getting destination', err);
                });
            setLocationInput('');

        } else {
            setSearchError('Please enter a destination!')
        }
    };

    // saves currently displayed list
    const handleSave = () => {
        const authToken = sessionStorage.getItem('authToken');
        const destination = sessionStorage.getItem('currentDestination');
        const editedList = items.map(item => ({...item, destination: destination}));
        
        // checks if user is logged in
        if (authToken) {
            axios.get(`${API_URL}/current`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            })
            .then(res => {
                const email= res.data.email;
                
                axios.post(`${API_URL}0/savelist`, {
                    email: email,
                    lists: editedList
                })
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.log(err);
                });     
            })
            .catch(err => {
                console.log(err);
            });
            setSaveSuccess(`List for ${destination} successfully saved to My Lists!`);
        } else {
            setSaveSuccess(`Please login to save this list for ${destination}!`);
        };
    };

    return (
        <>
            <div className="search__container">
                <a href={weatherLink} target='_blank' className='search__weather-link'>
                    <h3 className='search__weather'>
                        {weatherData}
                    </h3>
                </a>
                <form className='search__form' onSubmit={handleSearchSubmit}>
                    <input 
                        className="search__input input" 
                        type="text" 
                        placeholder='Enter your destination' 
                        value={locationInput} 
                        onChange={handleSearchInput}
                    />
                    <button className="search__button button" type="submit">
                        Search
                    </button>
                </form>
            </div>
            <p className='search__error'>
                {searchError}
            </p>
               
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

            <button className={`${weatherData ? 'search__button-save button' : 'button--hidden'}`} onClick={handleSave}>
                Save to My List
            </button>
            <p className='search__success'>
                {saveSuccess}
            </p>
        </>
    );
};

export default SearchBar;