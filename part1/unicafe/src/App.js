import { useState } from 'react'

const Button = ({ text, onClick }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const StatisticsLine = ({ text, value, isPercentage }) => {
  if (isPercentage) {
    return (
      <tr>
        <td>{text}</td>
        <td>{value} %</td> 
      </tr>
    );
  } else {
    return (
      <tr>
        <td>{text}</td>
        <td>{value}</td> 
      </tr>
    );
  }
}

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;

  if (total === 0) {
    return (
      <>
        <h1>statistics</h1>
        <div>No feedback provided.</div>
      </>
    )
  } else {
    const average = (good - bad) / total;
    const positive = (good / total) * 100;

    return (
      <>
        <h1>statistics</h1>

        <table>
          <tbody>
          <StatisticsLine text='good' value={good} isPercentage={false} />
          <StatisticsLine text='neutral' value={neutral} isPercentage={false} />
          <StatisticsLine text='bad' value={bad} isPercentage={false} />
          <StatisticsLine text='all' value={total} isPercentage={false} />
          <StatisticsLine text='average' value={average} isPercentage={false} />
          <StatisticsLine text='positive' value={positive} isPercentage={true} />
          </tbody>
        </table>
      </>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h1>give feedback</h1>
      <Button text='good'    onClick={() => setGood(good + 1)} />
      <Button text='neutral' onClick={() => setNeutral(neutral + 1)} />
      <Button text='bad'     onClick={() => setBad(bad + 1)} />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App