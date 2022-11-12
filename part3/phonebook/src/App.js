import { useEffect, useState } from 'react';

import personService from './services/persons';

import Form from './components/Form';
import People from './components/People';
import SearchFilter from './components/SearchFilter';


const App = () => {
  // State hooks
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  // const [newID, setNewID] = useState(5);

  // Effect hooks
  useEffect(() => {
    personService
      .getAll()
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

    // const personObject = { name: newName, number: newNumber, id: newID };
    const personObject = { name: newName, number: newNumber };
    
    if (persons.every(person => person.name !== newName)) {
      personService
        .create(personObject)
        .then(response => {
          const newObject = response.data;
          setNewName('');
          setNewNumber('');
          setPersons(persons.concat(newObject));
        })
        .catch(error => {
          console.log(error);
        })
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