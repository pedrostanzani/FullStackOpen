const Person = (props) => {
  return (
    <div>
      {props.name} {props.phone}
      <button onClick={props.deletePerson}>delete</button>
    </div>
  )
}

export default Person;