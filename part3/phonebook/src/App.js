import { useEffect, useState } from 'react';

import personService from './services/persons';

import Form from './components/Form';
import People from './components/People';
import Filter from './components/Filter';

import utils from './utils';


const App = () => {
  // State hooks
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')     // Add person form
  const [newNumber, setNewNumber] = useState('') // Add person form
  const [filter, setFilter] = useState('')       // Filter form

  const setAllContacts = () => {
    personService
      .getAll()
      .then(contacts => {
        setPersons(contacts);
      })
  }

  // Effect hook
  useEffect(() => { setAllContacts(); }, [])

  // Form field input handlers
  const handleFilterChange      = (event) => { setFilter(event.target.value); }
  const handleNameInputChange   = (event) => { setNewName(event.target.value); }
  const handleNumberInputChange = (event) => { setNewNumber(event.target.value); }

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check for empty fields
    if (utils.areEmpty(newNumber, newName)) { alert("Can't add — empty field!"); return; }

    const newPerson = { name: newName, number: newNumber };

    // Check if contact already exists and suggest phone number change
    if (persons.some(person => person.name === newName)) {
      const message = `${newName} is already added to the phonebook. Replace the old number with a new one?`;
      const confirmation = window.confirm(message);

      if (!confirmation) { return; }

      const id = persons.find(p => p.name === newName).id;
      personService
        .update(newPerson, id)
        .then(() => setAllContacts());

      return;
    }

    // Create new contact
    personService
      .create(newPerson)
      .then(() => setAllContacts());
  }

  const deletePerson = (id) => {
    const personObject = persons.find(p => p.id === id);

    const message = `Are you sure you want to delete ${personObject.name}?`;
    const confirmation = window.confirm(message);

    if (!confirmation) { return; }

    personService
      .deletePerson(personObject.id)
      .then(() => setAllContacts());
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter value={filter} onChange={handleFilterChange} />

      <h3>Add a new</h3>
      <Form
        onSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
        onNameChange={handleNameInputChange}
        onNumberChange={handleNumberInputChange}
      />

      <h3>Numbers</h3>
      <People persons={persons} filter={filter} deletePerson={deletePerson} />

    </div>
  )
}

export default App;