import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import './HomePage.scss'
// import SuggestForm from '../../components/SuggestForm/SuggestForm';
import ChecklistItems from '../../components/ChecklistItems/ChecklistItems';
import ChecklistForm from '../../components/ChecklistForm/ChecklistForm';
import ChecklistList from '../../components/ChecklistList/ChecklistList'

function HomePage() {

    const [inputText, setInputText] = useState('');
    const [items, setItems] = useState([]);
    const [locationInputText, setLocationInputText] = useState('');
    const [checklist, setChecklist] = useState('')

    return (
        <div className='homepage'>
            <h1>home page</h1>
            <SearchBar 
                locationInputText={locationInputText} 
                setLocationInputText={setLocationInputText}
            />
        
            <ChecklistForm 
                inputText={inputText} 
                setInputText={setInputText} 
                items={items} 
                setItems={setItems} 
                checklist={checklist} 
                setChecklist={setChecklist} 
                locationInputText={locationInputText}
            />
            
            <ChecklistList 
                items={items} 
                setItems={setItems}
            />
        </div>
    );
}

export default HomePage;