import { useState } from 'react'

const Button = ({ text, onClick }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const AnecdoteOfTheDay = ({ anecdote, votes, handleVote, handleNext }) => {
  return (
    <>
      <h1>Anecdote of the day</h1>
      <div>{anecdote}</div>
      <div>has {votes} votes</div>
      <Button text='vote' onClick={handleVote} />
      <Button text='next anecdote' onClick={handleNext} />
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length))

  const handleNext = () => {
    const i = Math.floor(Math.random() * 7);
    setSelected(i);
  }

  const handleVote = () => {
    const copy = [ ...votes ];
    copy[selected]++;
    setVotes(copy);
  }

  const max = Math.max(...votes);
  const mostVoted = votes.indexOf(max);

  if (max === 0) {
    return (
      <>
        <AnecdoteOfTheDay 
          anecdote={anecdotes[selected]} 
          votes={votes[selected]} 
          handleVote={handleVote}
          handleNext={handleNext}
        />
        <h1>Anecdote with most votes</h1>
        <div>No votes have been cast so far.</div>
      </>
    )
  } else {
    return (
      <>
        <AnecdoteOfTheDay 
          anecdote={anecdotes[selected]} 
          votes={votes[selected]} 
          handleVote={handleVote}
          handleNext={handleNext}
        />
        <h1>Anecdote with most votes</h1>
        <div>{anecdotes[mostVoted]}</div>
        <div>has {votes[mostVoted]} votes</div>
      </>
    )
  }
}

export default App