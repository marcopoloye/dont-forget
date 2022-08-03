import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MobileSideBar from './components/MobileSideBar/MobileSideBar';

function App() {
  return (
    <Router>
      <Header />
      <MobileSideBar />
      <Switch>
        <Route path='/' exact component={HomePage}/>
        <Route path='/destination/:id' />
        <Route path='/about' component={About}/>
        <Route path='/contact' />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
