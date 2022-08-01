import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Header from './components/Header';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <>
      <Header/>
      <SearchBar/>
    </>
  );
}

export default App;
