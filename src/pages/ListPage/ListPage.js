import './ListPage.scss';
import SuggestForm from '../../components/SuggestForm/SuggestForm';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import SearchBar from '../../components/SearchBar/SearchBar'

function ListPage() {
    const [listData, setListData] = useState('');

    axios
        .get(`http://localhost:8080/items/`)
        .then(response => {
            console.log(response.data);
        })
        .catch((err) => {
            console.log('error', err)
        })


    useEffect(() => {

    })
    
    return (
        <>
            <h1>List page</h1>
            <SearchBar />
        </>
    );
}

export default ListPage;
