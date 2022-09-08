import './SuggestForm.scss'

function SuggestForm() {

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target[0].value)
    }

    return (
        <div className="suggest__container">
            <form onSubmit={handleSubmit}>
                <input className="suggest__input" type="search"/>
                <button className="suggest__button" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default SuggestForm;