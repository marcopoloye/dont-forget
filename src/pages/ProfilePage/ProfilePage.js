import { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import './ProfilePage.scss'

class ProfilePage extends Component {
    state = {
        failedAuth: false,
        user: null
    }
    
    componentDidMount() {
        const authToken = sessionStorage.getItem('authToken');
    
        if (!authToken) {
        this.setState({
            failedAuth: true
        });
        }
    
        axios
        .get('http://localhost:8080/current', {
            headers: {
            Authorization: `Bearer ${authToken}`
            }
        })
        .then((res) => {
            console.log('User Auth Success:', res.data);
            this.setState({
            user: res.data,
            failedAuth: false
            })
        })
        .catch(err => {
            this.setState({
            failedAuth: true
            });
        });
    }
    
    handleLogout = () => {
        this.setState({
            user: null,
            failedAuth: true
        });
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('currentEmail');
        sessionStorage.removeItem('currentSavedList');
        sessionStorage.removeItem('currentDestination');
    }
    
    render() {
        if (this.state.failedAuth) {
            return (
                <Redirect to='/login'/>
            );
        }
    
        if (!this.state.user) {
            return (
                <main className="dashboard">
                    <p>... Loading ...</p>
                </main>
            )
        }
    
        const { first_name, last_name, email, created_at} = this.state.user;
    
        return (
        <div className='profilepage'>
            <h2 className='profilepage__heading'>My Profile</h2>
            <p className='profilepage__text'>
                <b>First name: </b>{first_name}
            </p>
            <p className='profilepage__text'>
                <b>Last name: </b>{last_name}
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
        </div>
        );
    }
}

export default ProfilePage;