import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
// import ListPage from './pages/ListPage/ListPage';
import AboutPage from './pages/AboutPage/AboutPage';
import ContactPage from './pages/ContactPage/ContactPage';
import ListPage from './pages/ListPage/ListPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
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
        <Route path='/about' component={AboutPage}/>
        <Route path='/contact' component={ContactPage}/>
        <Route path='/my-lists' component={ListPage}/>
        <Route path='/profile' component={ProfilePage}/>
        <Route path='/login' component={LoginPage}/>
        <Route path='/signup' component={SignUpPage}/>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
