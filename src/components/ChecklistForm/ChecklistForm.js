import React from 'react';
import { v4 as uuid } from 'uuid';
import './ChecklistForm.scss'
function ChecklistForm ({inputText, setInputText, items, setItems, checklist, setChecklist, locationInputText}) {

    const handleChange = (e) => {
        setInputText(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const inputValue = e.target[0].value;

        if (inputValue) {
            setItems([...items, {text: inputText, checked: false, id: uuid()}]);
            setInputText('');
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className={`${locationInputText ? '' : 'main-form'}`}>
                <input value={inputText} type='text' onChange={handleChange} placeholder='Add an item'/>
                <button type='submit'>Add</button>
            </form>
        </>
    );
}

export default ChecklistForm ;