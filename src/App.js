import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import About from './pages/About';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MobileSideBar from './components/MobileSideBar/MobileSideBar';
import { useMediaQuery } from 'react-responsive';

function App() {
  const mobile = useMediaQuery({ query: '(max-width: 767px)'})
  const tablet = useMediaQuery({ query: '(min-width: 768px)'})

  return (
    <Router>
      {mobile && <MobileSideBar/>}
      {tablet && <Header />}
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
