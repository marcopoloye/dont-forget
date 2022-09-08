import './ChecklistForm.scss';
import React from 'react';
import { v4 as uuid } from 'uuid';

function ChecklistForm ({inputText, setInputText, items, setItems, weatherData}) {

    // displays current input
    const handleChange = (e) => {
        setInputText(e.target.value);
    };

    // adds current input field to list
    const handleSubmit = (e) => {
        e.preventDefault();
        const inputValue = e.target[0].value;

        if (inputValue) {

            if (items.findIndex(item => item.itemName.toLowerCase() === inputValue.toLowerCase()) !== -1) {
                console.log('same value');
            } else {
                setItems([...items, {itemName: inputText, packed: false, id: uuid()}]);
                setInputText('');
            };
        } else {
            console.log('empty input');
        };
    };

    return (
        <>
            <form onSubmit={handleSubmit} className={`${weatherData ? 'checklist__form' : 'checklist__form--hidden'}`}>
                <h3 className='checklist__form-text'>
                    Here is a recommended packing list:
                </h3>
                <div className='checklist__form-container'>
                    <input 
                        className='checklist__form-input input' 
                        value={inputText} 
                        type='text' 
                        onChange={handleChange} 
                        placeholder='Add an item'
                    />
                    <button className='checklist__form-button button' type='submit'>
                        Add
                    </button>
                </div>
            </form>
        </>
    );
};

export default ChecklistForm ;