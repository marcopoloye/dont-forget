import './SearchBar.scss';


function SearchBar() {

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target[0].value);
        
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