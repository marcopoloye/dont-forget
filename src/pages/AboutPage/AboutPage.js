import './AboutPage.scss';
import { Link } from 'react-router-dom';

function AboutPage() {
    return (
        <div className='aboutpage'>
            <h2 className='aboutpage__heading'>About</h2>
            <p className='aboutpage__text'>Don't Forget is a checklist app designed to help forgetful travelers remember what to pack.</p>
            <p className='aboutpage__text'>Simply search for a destination and the app will suggest a list of items depending on the weather at your destination!</p>
            <p className='aboutpage__text'>Created by: <Link to='/contact' className='aboutpage__link'>Marco Ye</Link></p>
        </div>
    );
}

export default AboutPage;