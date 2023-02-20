import { useState } from "react";

const StatisticLine  = (props) =>{

  return (
    <>
      <tr>
        <td>
          {props.text} {props.value}
      </td>
      </tr>
    </>
  )

}

const Button = (props) =>{
  return(
    <div>
      <button onClick={props.handleClick}>{props.text}</button>
    </div>
  )
}

const App = () =>{
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const handleGood = () =>{
    setGood(good+1)
  }

  const handleNeutral = () =>{
    setNeutral(neutral+1)
  }

  const handleBad = () =>{
    setBad(bad+1)
  }

  const total = good + neutral + bad
  const avg = good + (bad * (-1))
  const percent = good * (100/total)

  if (total == 0) return(
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGood} text='good'/>
      <Button handleClick={handleNeutral} text='neutral'/>
      <Button handleClick={handleBad} text='bad'/>

      <h1>statistics</h1>
      <p>no feedback given</p>
    </div>

  )
    
  return(
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGood} text='good'/>
      <Button handleClick={handleNeutral} text='neutral'/>
      <Button handleClick={handleBad} text='bad'/>

      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine  text='good' value={good}/>
          <StatisticLine  text='neutral' value={neutral}/>
          <StatisticLine  text='bad' value={bad}/>
          <StatisticLine  text='all' value={total}/>
          <StatisticLine  text='average' value={avg/total}/>
          <StatisticLine  text='positive' value={percent}/>
        </tbody>
      </table>
    </div>
  )
}


export default App