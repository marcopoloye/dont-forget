import './Header.scss'
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className="header">
            <ul className="header__list">
                <Link className='header__link' to='/'>
                    <li className="header__item">
                        Home
                    </li>
                </Link>
                <Link className='header__link' to='/my-lists'>
                    <li className="header__item">
                        My Lists
                    </li>
                </Link>
                <Link className='header__link' to='/profile'>
                    <li className="header__item">
                        Profile
                    </li>
                </Link>
            </ul>
        </header>
    );
};

export default Header;