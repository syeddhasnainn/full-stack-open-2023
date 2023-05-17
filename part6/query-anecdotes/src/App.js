import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQueryClient, useMutation, useQuery } from 'react-query'
import { getAnecdotes, updateAnecdote  } from './requests'
import { useNotificationDispatch } from './notificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()
  
  const result = useQuery('anecdotes',getAnecdotes,{retry: false})

  const updatedVoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })
  
  console.log(result)

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  const anecdotes = result.data

  const handleVote = async(anecdote) => {
    updatedVoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    await dispatch({ type: 'SHOW', payload: `You voted: ${anecdote.content} !`})

    setTimeout(() => {
      dispatch({ type: 'HIDE' })
    }, 5000)
    
    console.log('vote')
    
  }

  if (result.isError) {
    return <span>anecdote service is not available</span>
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
      
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
