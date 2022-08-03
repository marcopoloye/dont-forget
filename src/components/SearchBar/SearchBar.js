import './SearchBar.scss';
import axios from 'axios';

function SearchBar() {

    const handleSubmit = (e) => {
        e.preventDefault();

        const searchValue = e.target[0].value

        if (!searchValue) {
            console.log('empty');
        } else {
            axios
            .get(`http://api.openweathermap.org/geo/1.0/direct?q=${e.target[0].value}&appid=94659958f8437b131fd51734fb5ebf76`)
            .then (result => {
                const latitude = result.data[0].lat;
                const longitude = result.data[0].lon;
                console.log(searchValue, latitude, longitude)
            })
            .catch(error => {
                console.log('Error getting destination')
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