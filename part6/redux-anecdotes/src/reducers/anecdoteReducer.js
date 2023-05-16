import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdote';

const anecdoteSlice = createSlice({
  name:'anecdotes',
  initialState: [],
  reducers: {
    addVote(state, action){
      
      const id = action.payload.id;
      const anecdote = state.find((anecdote) => anecdote.id === id);
      if (anecdote) {
        anecdote.votes += 1;
        state.sort((a, b) => b.votes - a.votes);
      }
    },

    appendAnecdote(state, action) {
      state.push(action.payload)
    },

    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const {addVote, appendAnecdote, setAnecdotes} = anecdoteSlice.actions

export const initializeAnecdote = () => {
  return async dispatch => {
    const anecdote = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdote))
  }
}

export const createAnecdote = anecdote => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const addVotes = id => {
  return async dispatch => {
    const newVote = await anecdoteService.update(id)
    dispatch(addVote(newVote))
  }
}

export default anecdoteSlice.reducer