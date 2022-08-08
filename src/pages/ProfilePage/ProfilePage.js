import { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
    }
    
    render() {
        if (this.state.failedAuth) {
            return (
                <main className="dashboard">
                <p>
                    You must be logged in to see this page.{' '}
                    <Link to="/login">Log in</Link>
                </p>
                </main>
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
        <main>
            <h1>Dashboard</h1>
            <p>
            Welcome back, {first_name} {last_name}
            </p>
            <h2>My Profile</h2>
            <p>Email: {email}</p>
            <p>User since: {created_at}</p>
            <button onClick={this.handleLogout}>
            Log out
            </button>
        </main>
        );
    }
}

export default ProfilePage;