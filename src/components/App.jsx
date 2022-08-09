import React, { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import { nanoid } from 'nanoid';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  addContact = data => {
    const contactObject = {
      id: nanoid(),
      name: data.name.trim(),
      number: data.number.trim(),
    };
    if (
      this.state.contacts.some(
        contact => contact.name === contactObject.name.trim()
      )
    ) {
      alert(` ${contactObject.name} is already in contacts`);
      return;
    }
    this.setState({ contacts: [contactObject, ...this.state.contacts] });
  };

  removeContact = id => {
    this.setState(previousState => ({
      contacts: previousState.contacts.filter(contact => contact.id !== id),
    }));
  };

  filterValueChange = message => {
    this.setState({ filter: message.currentTarget.value });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const filteredContactsArray = [...contacts].filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    return filteredContactsArray;
  };

  componentDidMount() {
    const localStorageContacts = JSON.parse(localStorage.getItem('contacts'));
    if (localStorageContacts) {
      this.setState({ contacts: localStorageContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
      console.log('Contacts were rewrited to localStorage');
    }
  }

  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 30,
          color: '#010101',
        }}
      >
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />

        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChange={this.filterValueChange} />
        <ContactList
          contactsArray={this.getFilteredContacts()}
          onDelete={this.removeContact}
        />
      </div>
    );
  }
}
