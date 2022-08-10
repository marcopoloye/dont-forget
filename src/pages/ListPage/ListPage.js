import './ListPage.scss';
import { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


class ListPage extends Component {
  state = {
    failedAuth: false,
    user: null,
    items: ''
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
        const stringifiedEmail = JSON.stringify(res.data.email);
        sessionStorage.setItem('currentEmail', stringifiedEmail);
        // console.log(this.state.user)
        // console.log(res.data.lists)
        const parsedList = JSON.parse(res.data.lists)
        this.setState({
          user: res.data,
          failedAuth: false,
          items: parsedList
        });
      })
      .catch(err => {
        console.log(err)
        this.setState({
          failedAuth: true
        });
      });

  }
  
  deleteHandler = (e) => {
    const selectedItem = e.target.id;
    const filteredList = this.state.items.filter((item) => item.id !== selectedItem)

    this.setState({
      items: filteredList
    })
  }

  completeHandler = (e) => {
    const selectedItem = e.target.id;

    const editedList = this.state.items.map((item) => {
      if (item.id === selectedItem) {
        return {
          ...item, packed: !item.packed
        }
      } return item
    })

    this.setState({
      items: editedList
    })
  }

  handleSave = () => {
    const destination = sessionStorage.getItem('currentDestination');
    const parsedEmail = JSON.parse(sessionStorage.getItem('currentEmail'));
    const mostCurrentList = this.state.items;

    axios
      .post(`http://localhost:8080/savelist`, {
          email: parsedEmail,
          lists: mostCurrentList
      })
      .then(res => {
          console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
  }

  handleDelete = () => {
    console.log(this.state.items)
    const mostCurrentList = this.state.items;
    const parsedEmail = JSON.parse(sessionStorage.getItem('currentEmail'));

    axios
      .post(`http://localhost:8080/savelist`, {
          email: parsedEmail,
          lists: null
      })
      .then(res => {
          console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
      window.location.reload();
  }

  render() {
    if (this.state.failedAuth) {
      return (
        <main>
          <p className='listpage__failed-message'>
              You must be logged in to see this page.{' '}
              <Link to="/login" className='listpage__failed-link'>Click here to log in.</Link>
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

    if (!this.state.items) {
      return (
        <main className='listpage'>
          <h2 className='listpage__heading'>My Lists</h2>
          <p className='listpage__text'>No lists found</p>
        </main>
      )
    }
    return (
      <div className='listpage'>
        <h2 className='listpage__heading'>My Lists</h2>
        <p className='listpage__destination'>
          Packing list for {this.state.items[0].destination}:
        </p>
        <ul className='listpage__list'>
          {this.state.items.map(items => (
            <li key={items.id} className={`${items.packed ? 'listpage__items--strike' : 'listpage__items'}`}>
              {items.itemName}
              <div className='listpage__items-button-container' >
                <div className='listpage__items-button--green' id={items.id} onClick={this.completeHandler}/>
                <div className='listpage__items-button--red' id={items.id} onClick={this.deleteHandler}/>
              </div>
            </li>
          ))}
        </ul>
        <button onClick={this.handleSave}>Save List</button>
        <button onClick={this.handleDelete}>Delete List</button>
      </div>
    )
  }
}

export default ListPage;