function SuggestForm() {
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="suggest__container">
            <form onSubmit={handleSubmit}>
                <input className="suggest__input" type="search"></input>
                <button className="suggest__button" type="submit">Submit</button>
            </form>
        </div>
    );
}

export default SuggestForm;