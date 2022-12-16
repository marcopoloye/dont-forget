import './MobileHeader.scss';
import logo from '../../assets/icons/logo.svg';
import { useHistory } from 'react-router-dom';

function MobileHeader() {
    const history = useHistory();
    
    // returns to homepage
    const handleClick = (e) => {
        history.push('/');
    };

    return (
        <header className='mobileheader'>
            <img src={logo} className='mobileheader__logo' onClick={handleClick} alt='logo'/>
        </header>
    );
};

export default MobileHeader;