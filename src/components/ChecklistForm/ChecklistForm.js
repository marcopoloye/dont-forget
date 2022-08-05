import React, { useState } from 'react';


function ChecklistForm () {
    const [checklist, setChecklist] = useState({
        id: '',
        item: '',
        checked: false
    });

    const handleChange = (e) => {
        setChecklist({...checklist, item: e.target.value});
        console.log('change', e)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!checklist.item) {
            console.log('empty input')
        } else {
            
        }
        console.log('submit', e)
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type='input' onChange={handleChange} value={checklist.item}/>
                <button type='submit'>Add</button>
            </form>
        </>
    );
}

export default ChecklistForm ;