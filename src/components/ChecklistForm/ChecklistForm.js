import React from 'react';
import { v4 as uuid } from 'uuid';
import './ChecklistForm.scss';
import '../../styles/partials/_globals.scss';

function ChecklistForm ({inputText, setInputText, items, setItems, weatherData}) {

    const handleChange = (e) => {
        setInputText(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const inputValue = e.target[0].value;

        if (inputValue) {

            if (items.findIndex(item => item.itemName.toLowerCase() === inputValue.toLowerCase()) !== -1) {
                console.log('same value')
            } else {
                setItems([...items, {itemName: inputText, packed: false, id: uuid()}]);
            }

        } else {
            console.log('empty input')
        }
        setInputText('')
    }

    return (
        <>
            <form onSubmit={handleSubmit} className={`${weatherData ? '' : 'main-form'}`}>
                <input className='input'value={inputText} type='text' onChange={handleChange} placeholder='Add an item'/>
                <button className='button' type='submit'>Add</button>
            </form>
        </>
    );
}

export default ChecklistForm ;