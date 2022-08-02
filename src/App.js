import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

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
      <Footer />
    </Router>
  );
}

export default App;
