import './ListPage.scss';
import SuggestForm from '../../components/SuggestForm/SuggestForm';
import axios from 'axios';
import React, {useState, useEffect} from 'react';

function ListPage() {
    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=43.6534817&lon=-79.3839347&appid=94659958f8437b131fd51734fb5ebf76`)
            .then(result => {
            console.log(result.data.main.temp)
            })
            .catch(error => {
                console.log('Error getting weather data')
            })
    })
    
    return (
        <>
            <SuggestForm />
        </>
    );
}

export default ListPage;