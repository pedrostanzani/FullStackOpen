import { useState } from 'react'

const Person = (props) => <div>{props.name} {props.phone}</div>

const People = (props) => {
  // Apply search filter
  const personsToShow = props.persons.filter(person => {
    let name = person.name.toLowerCase();
    let query = props.filter.toLowerCase();
    return name.includes(query);
  })

  return (
    <>
      {personsToShow.map(person =>
        <Person key={person.id} name={person.name} phone={person.phone} />
      )}
    </>
  )
}

const SearchFilter = (props) => {
  return (
    <div>
      filter shown with: <input value={props.value} onChange={props.onChange} />
    </div>
  )
}

const Form = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        name: <input value={props.newName} onChange={props.onNameChange} />
      </div>

      <div>
        number: <input value={props.newNumber} onChange={props.onNumberChange} />
      </div>

      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const App = () => {
  // State declarations
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const [newID, setNewID] = useState(5);


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

    const personObject = { name: newName, phone: newNumber, id: newID };

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