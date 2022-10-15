const Header = (props) => (
    <>
        <h1>{props.course}</h1>
    </>
)


const Part = (props) => (
    <p>{props.part} {props.exercises}</p>
)

const Content = (props) => {
    const parts = props.parts.map((part) => 
        <Part part={part.name} exercises={part.exercises} key={part.name} />
    );

    return (
        <>{parts}</>
    )
}


const Total = (props) => {
    let number = 0;
    props.parts.forEach(part => {
        number += part.exercises;
    });

    return (
        <p>Number of exercises {number}</p>
    )
}


const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
          {
            name: 'Fundamentals of React',
            exercises: 10
          },
          {
            name: 'Using props to pass data',
            exercises: 7
          },
          {
            name: 'State of a component',
            exercises: 14
          }
        ]
    }
  
    return (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }
  
  export default App