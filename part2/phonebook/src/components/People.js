import Person from './Person';

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
        <Person 
          key={person.id}
          name={person.name}
          phone={person.number} 
          deletePerson={() => props.deletePerson(person.id)}
        />
      )}
    </>
  )
}

export default People;