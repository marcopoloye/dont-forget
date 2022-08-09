import logo from '../../assets/icons/logo.svg';
import './MobileHeader.scss';
import { useHistory } from 'react-router-dom';

function MobileHeader() {
    const history = useHistory();
    
    const handleClick = (e) => {
        history.push('/')
    }

    return (
        <header className='mobileheader'>
            <img src={logo} className='mobileheader__logo' onClick={handleClick}/>
        </header>
    );
}

export default MobileHeader;