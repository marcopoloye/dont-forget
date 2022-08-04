import './SearchBar.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';


function SearchBar() {

    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

    const handleSubmit = (e) => {
        e.preventDefault();

        const searchValue = e.target[0].value;

        if (!searchValue) {
            console.log('empty');
        } else {
            axios
            .get (`http://api.openweathermap.org/geo/1.0/direct?q=${e.target[0].value}&appid=${API_KEY}`)
            .then (result => {
                const latitude = result.data[0].lat;
                const longitude = result.data[0].lon;

                axios
                    .get (`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
                    .then (result => {
                        const temperature = Math.round((result.data.main.temp) - 273.15)
                        console.log(temperature)
                    })
                    .catch ((error) => {
                        console.log('Error', error);
                    })
            })
            .catch ((error) => {
                console.log('Error getting destination', error);
            })

            
        }
    }

    return (
        <div className="search__container">
            <form onSubmit={handleSubmit}>
                <input className="search__input" type="search"></input>
                    <button className="search__button" type="submit">Search</button>
            </form>
        </div>
    );
}

export default SearchBar;