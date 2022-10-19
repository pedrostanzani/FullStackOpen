const Header = (props) => (
  <>
    <h1>{props.name}</h1>
  </>
)

const Part = (props) => (
  <p>{props.name} {props.exercises}</p>
)

const Total = (props) => {
  const exercises = props.parts.reduce(
    (acc, cur) => {
      return acc + cur.exercises;
    }, 0
  )

  return (
    <p>Total of {exercises} exercises</p>
  )
}

const Course = ({ course }) => {
  const parts = course.parts.map(part => 
    <Part key={part.id} name={part.name} exercises={part.exercises} />
  )

  return (
    <>
      <Header name={course.name} />
      {parts}
      <Total parts={course.parts} />
    </>
  )
}

export default Course