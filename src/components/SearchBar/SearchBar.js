import './SearchBar.scss';
import '../../styles/partials/_globals.scss';
import axios from 'axios';
import React, { useState} from 'react';
import ChecklistForm from '../ChecklistForm/ChecklistForm';
import ChecklistList from '../ChecklistList/ChecklistList';
import SavedItemsList from '../SavedItemsList/SavedItemsList';

function SearchBar({locationInput, setLocationInput}) {
    const [inputText, setInputText] = useState('');
    const [items, setItems] = useState([]);
    const [weatherData, setWeatherData] = useState('');
    const [savedItems, setSavedItems] = useState([]);


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
                    const destination = (`${city}, ${country}`)
                    setWeatherData(`It is currently ${temperature} °C in ${destination}`);
                    sessionStorage.setItem('destination', destination)

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
    const handleClick = () => {
        const destination= sessionStorage.getItem('destination')
        const newnew = items.map(item => ({...item, destination: destination}));

        sessionStorage.setItem('newList', JSON.stringify(newnew));

        const authToken = sessionStorage.getItem('authToken');

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
                        lists: newnew
                    })
                    .then(res => {
                        console.log(res)
                    })
            })
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

            <button className={`${weatherData ? 'search__button-save button' : 'button--hidden'}`} onClick={handleClick}>Save to My List</button>
        </>

    );
}

export default SearchBar;