import './ContactPage.scss'

function ContactPage() {
    return (
        <div className='contactpage'>
            <h1 className='contactpage__heading'>Contact</h1>
            <div className='contactpage__card-container'>
                <a target="_blank" href="mailto:marco.ye99@gmail.com">
                    <div className='contactpage__card-mail'/>
                </a>
                <a target="_blank" href="https://www.linkedin.com/in/marcoye/">
                    <div className='contactpage__card-linkedin'/>
                </a>
                <a target="_blank" href="https://github.com/marcopoloye/dont-forget">
                    <div className='contactpage__card-github'/>
                </a>
            </div>
        </div>
    );
}

export default ContactPage;