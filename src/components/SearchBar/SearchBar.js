import './SearchBar.scss';

function SearchBar() {
    return (
        <div className="search__container">
            <input className="search__input" type="search"></input>
            <button className="search__button" type="submit">Search</button>
        </div>
    );
}

export default SearchBar;