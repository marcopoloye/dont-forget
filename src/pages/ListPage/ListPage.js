import './ListPage.scss';
import { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SavedItemsList from '../../components/SavedItemsList/SavedItemsList';

class ListPage extends Component {
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

      if (this.state.user.lists) {
        const parsedList = JSON.parse(this.state.user.lists)
        return (
          <>
            <p>{parsedList[0].destination}</p>
            <ul>
              {parsedList.map(items => (
              <li key={items.id}>{items.itemName}</li>
              ))}
            </ul>
          </>
        )
      }
      
      return (
        <main>
          <h1>List Page</h1>
        </main>
      );
    }
  }

export default ListPage;
