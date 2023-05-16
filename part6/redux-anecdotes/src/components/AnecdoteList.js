import { useSelector, useDispatch } from 'react-redux'
import { addVotes } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()
    
    const filter = useSelector(state => state.filter);
    const filteredAnecdotes = anecdotes
    .filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => b.votes - a.votes)

    
    const vote = (id) => {
        dispatch(addVotes(id))
        dispatch(showNotification(`you voted ${id}`, 5))
    }

    return (
        <div>
            {filteredAnecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList