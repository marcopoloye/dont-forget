import './ProfilePage.scss'
import { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import DeleteAccountModal from '../../components/DeleteAccountModal/DeleteAccountModal';

class ProfilePage extends Component {
    state = {
        failedAuth: false,
        user: null,
        modal: false
    };
    
    componentDidMount() {
        const authToken = sessionStorage.getItem('authToken');
    
        if (!authToken) {
            this.setState({
                failedAuth: true
            });
        };
    
        // checks if user is logged in
        axios.get(`https://dontforgetapi.netlify.app/current`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })
        .then((res) => {
            console.log('User Auth Success:', res.data);

            this.setState({
                user: res.data,
                failedAuth: false
            });
        })
        .catch(err => {
            this.setState({
                failedAuth: true
            });
        });
    };
    
    handleLogout = () => {
        this.setState({
            user: null,
            failedAuth: true
        });

        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('currentEmail');
        sessionStorage.removeItem('currentDestination');
    };

    openModal = () => {
        this.setState({
          modal: true
        });
      };
    
    closeModal = () => {
        this.setState({
        modal: false
        });
    };

    // deletes user account
    handleDelete = () => {
        const parsedEmail = JSON.parse(sessionStorage.getItem('currentEmail'));

        axios.delete(`https://dontforgetapi.netlify.app/deleteuser`, {
            data: {
                email: parsedEmail
            }
        })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
          console.log(err);
        });

        this.handleLogout();
    }

    render() {
        if (this.state.failedAuth) {
            return (
                <Redirect to='/login'/>
            );
        };
    
        if (!this.state.user) {
            return (
                <main className="dashboard">
                    <p>... Loading ...</p>
                </main>
            );
        };
    
        const { first_name, last_name, email, created_at} = this.state.user;
    
        return (
            <div className='profilepage__container'>
                <div className='profilepage'>
                    <h1 className='profilepage__heading'>
                        My Profile
                    </h1>
                    <p className='profilepage__text'>
                        <b>First name: </b> {first_name}
                    </p>
                    <p className='profilepage__text'>
                        <b>Last name: </b> {last_name}
                    </p>
                    <p className='profilepage__text'>
                        <b>Email: </b> {email}
                    </p>
                    <p className='profilepage__text'>
                        <b>User since: </b> {created_at}
                    </p>
                    <button className='profilepage__button button' onClick={this.handleLogout}>
                        Log out
                    </button>
                    <button className='profilepage__button button' id='delete-button' onClick={this.openModal}>
                        Delete account
                    </button>
                </div>
                {this.state.modal && <DeleteAccountModal closeModal={this.closeModal} deleteAccount={this.handleDelete}/>}
            </div>
        );
    };
};

export default ProfilePage;