import './Footer.scss'
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="footer">
            <ul className="footer__list">
                <Link to='/about' className='footer__link'>
                    <li className="footer__item">
                        About
                    </li>
                </Link>
                <Link to='/contact' className='footer__link'>
                    <li className="footer__item">
                        Contact
                    </li>
                </Link>
            </ul>
        </footer>
    );
};

export default Footer;