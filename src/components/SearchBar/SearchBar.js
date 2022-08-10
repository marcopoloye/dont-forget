import './SearchBar.scss';
import '../../styles/partials/_globals.scss';
import axios from 'axios';
import React, { useState} from 'react';
import ChecklistForm from '../ChecklistForm/ChecklistForm';
import ChecklistList from '../ChecklistList/ChecklistList';
import { Link } from 'react-router-dom';

function SearchBar({locationInput, setLocationInput}) {
    const [inputText, setInputText] = useState('');
    const [items, setItems] = useState([]);
    const [weatherData, setWeatherData] = useState('');
    const [savedItems, setSavedItems] = useState([]);
    const [destination, setDestination] = useState('');
    const [saveSuccess, setSaveSuccess] = useState('');

    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

    const handleSearchInput = (e) => {
        setLocationInput(e.target.value);
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault();

        const searchValue = e.target[0].value;

        if (searchValue) {
            axios
                .get (`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=${API_KEY}`)
                .then (response => {
                    const temperature = Math.round((response.data.main.temp) - 273.15);
                    const city = response.data.name;
                    const country = response.data.sys.country;
                    const destination = (`${city}, ${country}`);
                    const destinationId = response.data.id;

                    setDestination(destinationId);
                    setWeatherData(`It is currently ${temperature} °C in ${destination}`);
                    sessionStorage.setItem('currentDestination', destination);

                    if (`${temperature}` >= 20) {
                        axios
                        .get (`http://localhost:8080/summer-items`)
                        .then (response => {
                            const itemsList = response.data;
                            setItems(itemsList);
                        })
                        .catch (error => {
                            console.log('Error getting items', error);
                        });
                    } else if (`${temperature}` < 20 && `${temperature}` > 14) {
                        axios
                        .get (`http://localhost:8080/spring-items`)
                        .then (response => {
                            const itemsList = response.data;
                            setItems(itemsList);
                        })
                        .catch (error => {
                            console.log('Error getting items', error);
                        });
                    } else if (`${temperature}` <= 14 && `${temperature}` > 9) {
                        axios
                        .get (`http://localhost:8080/fall-items`)
                        .then (response => {
                            const itemsList = response.data;
                            setItems(itemsList);
                        })
                        .catch (error => {
                            console.log('Error getting items', error);
                        });
                    } else if (`${temperature}` <= 9){
                        axios
                        .get (`http://localhost:8080/winter-items`)
                        .then (response => {
                            const itemsList = response.data;
                            setItems(itemsList);
                        })
                        .catch (error => {
                            console.log('Error getting items', error);
                        });
                    }
                })
                .catch (error => {
                    console.log('Error getting destination', error);
                });

            setLocationInput('');
        }
    }
    const handleSave = () => {
        const authToken = sessionStorage.getItem('authToken');
        const destination = sessionStorage.getItem('currentDestination');
        const editedList = items.map(item => ({...item, destination: destination}));

        sessionStorage.setItem('currentSavedList', JSON.stringify(editedList));
        
        if (authToken) {
            axios
                .get('http://localhost:8080/current', {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                })
                .then((res) => {
                    const email= res.data.email;
                    
                    axios
                        .post(`http://localhost:8080/savelist`, {
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
            setSaveSuccess(`Please login to save this list for ${destination}!`)
        }
    }

    return (
        <>
            <div className="search__container">
                <h3 className='search__weather'>{weatherData}</h3>
                <form className='search__form' onSubmit={handleSearchSubmit}>
                    <input className="search__input input" type="text" placeholder='Enter your destination' value={locationInput} onChange={handleSearchInput}/>
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

            <button className={`${weatherData ? 'search__button-save button' : 'button--hidden'}`} onClick={handleSave}> Save to My List </button>
            <p className='search__success'>{saveSuccess}</p>
        </>

    );
}

export default SearchBar;