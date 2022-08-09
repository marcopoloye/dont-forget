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
        this.setState({
          user: res.data,
          failedAuth: false
        });
        const parsedList = JSON.parse(this.state.user.lists);
        this.setState({
          items: parsedList
        })
      })
      .catch(err => {
        this.setState({
          failedAuth: true
        });
      });
  }

  deleteHandler = (e) => {
    const selectedItem = e.target.id
    const newnewList = this.state.items.filter((item) => item.id !== selectedItem)

    this.setState({
      items: newnewList
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
        <main>
          <h2 className='listpage__heading'>My Lists</h2>
          <p>packing list is empty</p>
        </main>
      )
    }
      return (
        <div className='listpage'>
          <h2 className='listpage__heading'>My Lists</h2>
          <p className='listpage__destination'>
            Packing list for {this.state.items[0].destination}
          </p>
          <ul className='listpage__list'>
            {this.state.items.map(items => (
              <li key={items.id} className={`${items.packed ? 'listpage__items--strike' : 'listpage__items'}`}>
                {items.itemName}
                <div className='listpage__items-button-container' >
                  <div className='listpage__items-button--green' id={items.id} onClick={this.completeHandler}/>
                  <div className='listpage__items-button--red' id={items.id}onClick={this.deleteHandler}/>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )
  }
}

export default ListPage;