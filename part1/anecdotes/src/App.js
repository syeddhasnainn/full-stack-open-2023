import { useState } from 'react'

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
  const [votes, setVotes] = useState(Array(7).fill(0))

  const Randomizer = () =>{
    const random = Math.floor(Math.random() * anecdotes.length)
    setSelected(random)
  }
  
  const handleVotes = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  const most = Math.max(...votes)
  const findIndex = votes.indexOf(most)

  const mvp = anecdotes[findIndex]
  console.log(mvp)

  console.log(findIndex)

  return (
    <div>
      <h1>Anecdote of the data</h1>
      {anecdotes[selected]}
      <p>has {votes[selected]} vote</p>
      <br></br>
      <button onClick={handleVotes}>vote</button>
      <button onClick={Randomizer}>next anecdote</button>

      <h1>Anecdote with most votes</h1>
      <p>{mvp}</p>
      <p>has {votes[findIndex]} votes</p>
      
    </div>
  )
}

export default App