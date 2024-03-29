import './ListPage.scss';
import { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import DeleteListModal from '../../components/DeleteListModal/DeleteListModal';

class ListPage extends Component {
  state = {
    failedAuth: false,
    user: null,
    items: '',
    saveSuccess: '',
    modal: false,
    currentInput: '',
    currentList: []
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
    .then(res => {
      const parsedList = JSON.parse(res.data.lists);

      this.setState({
        user: res.data,
        failedAuth: false,
        items: parsedList
      });
    })
    .catch(err => {
      console.log(err);

      this.setState({
        failedAuth: true
      });
    });
  };
  
  // removes item from list
  deleteItemHandler = (e) => {
    const selectedItem = e.target.id;
    const filteredList = this.state.items.filter((item) => item.id !== selectedItem);

    this.setState({
      items: filteredList
    });
  };

  // crosses out item from list
  checkItemHandler = (e) => {
    const selectedItem = e.target.id;

    const editedList = this.state.items.map((item) => {
      if (item.id === selectedItem) {
        return {
          ...item, packed: !item.packed
        }
      } return item
    });

    this.setState({
      items: editedList
    });
  };

  // saves changes made to list
  handleSaveList = () => {
    const parsedEmail = JSON.parse(sessionStorage.getItem('currentEmail'));
    const mostCurrentList = this.state.items;

    axios.post(`https://dontforgetapi.netlify.app/savelist`, {
      email: parsedEmail,
      lists: mostCurrentList
    })
    .then(res => {
      console.log(res);

      this.setState({
        saveSuccess: `Successfully saved changes for ${this.state.items[0].destination}!`
      });
    })
    .catch(err => {
      console.log(err);
    });
  };

  handleDeleteList = () => {
    const parsedEmail = JSON.parse(sessionStorage.getItem('currentEmail'));

    axios.post(`https://dontforgetapi.netlify.app/savelist`, {
      email: parsedEmail,
      lists: null
    })
    .then(res => {
      console.log(res);
      window.location.reload();
    })
    .catch(err => {
      console.log(err);
    });
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

  // displays current input
  handleInputChange = (e) => {
    e.preventDefault();

    this.setState({
      currentInput: e.target.value
    });
  };

  // adds current input field to list
  handleSubmit = (e) => {
    e.preventDefault();
    const mostCurrentList = this.state.items;
    const inputValue = e.target[0].value;

    if (inputValue) {
      if (mostCurrentList.findIndex(item => item.itemName.toLowerCase() === inputValue.toLowerCase()) !== -1) {
        console.log('same value');
      } else {
        this.setState({
          items: [...mostCurrentList, {itemName: inputValue, packed: false, id: uuid()}],
          currentInput: ''
        });
      }
    } else {
      console.log('empty input');
    };
  };

  render() {
    if (this.state.failedAuth) {
      return (
        <Redirect to='/login'/>
      );
    };

    if (!this.state.items) {
      return (
        <main className='listpage'>
          <h2 className='listpage__heading'>My Lists</h2>
          <p className='listpage__text'>Nothing seems to be here...</p>
        </main>
      );
    };

    return (
      <div className='listpage'>
        <h1 className='listpage__heading'>
          My Lists
        </h1>
        <h3 className='listpage__destination'>
          Packing list for {this.state.items[0].destination}:
        </h3>
        <div>
          <form className='listpage__form' onSubmit={this.handleSubmit}>
            <div className='listpage__form-container'>
              <input 
                className='listpage__form-input input' 
                type='text' 
                onChange={this.handleInputChange} 
                value={this.state.currentInput} 
                placeholder='Add an item'
              />
              <button className='listpage__form-button button' type='submit'>
                Add
              </button>
            </div>
          </form>
        </div>
        <ul className='listpage__list'>
          {this.state.items.map(items => (
            <li key={items.id} className={`${items.packed ? 'listpage__items--strike' : 'listpage__items'}`}>
              {items.itemName}
              <div className='listpage__items-button-container'>
                <div className='listpage__items-button--green' id={items.id} onClick={this.checkItemHandler}/>
                <div className='listpage__items-button--red' id={items.id} onClick={this.deleteItemHandler}/>
              </div>
            </li>
            ))
          }
          <div className='listpage__buttons-container'>
            <button className='listpage__buttons button' onClick={this.handleSaveList}>
              Save Changes
            </button>
            <button className='listpage__buttons button' onClick={this.openModal} id='delete-button'>
              Delete List
            </button>
          </div>
        </ul>
        <p className='listpage__success'>
          {this.state.saveSuccess}
        </p>
        {this.state.modal && <DeleteListModal destination={this.state.items[0].destination} closeModal={this.closeModal} deleteList={this.handleDeleteList}/>}
      </div>
    );
  };
};

export default ListPage;