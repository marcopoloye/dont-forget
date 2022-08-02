import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import Header from './components/Header/Header';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path='/' exact component={HomePage}/>
        <Route path='/destination/:id' />
        <Route path='/about' />
        <Route path='/contact' />
      </Switch>
    </Router>
  );
}

export default App;
