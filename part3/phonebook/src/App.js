import { useEffect, useState } from 'react';
import axios from 'axios';

import Form from './components/Form';
import People from './components/People';
import SearchFilter from './components/SearchFilter';


const App = () => {
  // State hooks
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const [newID, setNewID] = useState(5);


  // Effect hooks
  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data);
    })
  }, [])


  // Event/input handlers
  const handleNameInputChange = (event) => { setNewName(event.target.value); }
  const handleNumberInputChange = (event) => { setNewNumber(event.target.value); }
  const handleFilterChange = (event) => { setFilter(event.target.value); }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (newNumber.trim() === '' || newName.trim() === '') {
      alert("Can't add — empty field!")
      return;
    }

    const personObject = { name: newName, number: newNumber, id: newID };

    if (persons.every(person => person.name !== newName)) {
      setPersons(persons.concat(personObject));
      setNewID(newID + 1);
      setNewName('');
      setNewNumber('');
    } else {
      alert(`${newName} has already been added to the phonebook!`);
    };
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter value={filter} onChange={handleFilterChange} />

      <h3>Add a new</h3>
      <Form
        onSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
        onNameChange={handleNameInputChange}
        onNumberChange={handleNumberInputChange}
      />

      <h3>Numbers</h3>
      <People persons={persons} filter={filter} />

    </div>
  )
}

export default App;