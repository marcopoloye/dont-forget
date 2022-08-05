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
    const [locationInputText, setLocationInputText] = useState('')

    return (
        <div className='homepage'>
            <h1>home page</h1>
            <SearchBar locationInputText={locationInputText} setLocationInputText={setLocationInputText}/>
            <h2>packing list</h2>            
            <ChecklistForm inputText={inputText} setInputText={setInputText} items={items} setItems={setItems}/>
            <ChecklistList items={items} setItems={setItems}/>
        </div>
    );
}

export default HomePage;