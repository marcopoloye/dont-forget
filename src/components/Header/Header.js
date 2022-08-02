import './Header.scss'

function Header() {
    return (
        <header className="header">
            <ul className="header__list">
                <li className="header__item">
                    Home
                </li>
                <li className="header__item">
                    My Lists
                </li>
                <li className="header__item">
                    Profile
                </li>
            </ul>
        </header>
    );
}

export default Header;