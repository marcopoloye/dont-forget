import './ContactPage.scss';

function ContactPage() {
    return (
        <div className='contactpage'>
            <h1 className='contactpage__heading'>
                Contact
            </h1>
            <div className='contactpage__card-container'>
                <a target="_blank" href="mailto:marco.ye99@gmail.com" rel='noreferrer'>
                    <div className='contactpage__card-mail'/>
                </a>
                <a target="_blank" href="https://www.linkedin.com/in/marcoye/" rel='noreferrer'>
                    <div className='contactpage__card-linkedin'/>
                </a>
                <a target="_blank" href="https://github.com/marcopoloye/dont-forget" rel='noreferrer'>
                    <div className='contactpage__card-github'/>
                </a>
            </div>
        </div>
    );
};

export default ContactPage;