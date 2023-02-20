import { useEffect, useState } from "react";
import Filter from './components/Filter'
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import personService from "./services/persons"
import Notification from "./components/Notification"

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameChange = event => setNewName(event.target.value)
  const handleNumberChange = event => setNewNumber(event.target.value)
  const handleFilter = event => setFilter(event.target.value)

  const handleSubmit = event => {
    event.preventDefault()
    const newPerson = { 'name': newName, 'number': newNumber }
    const comparePersons = persons.find(person => person.name.toLowerCase() === newPerson.name.toLowerCase())
    
    if (comparePersons && comparePersons.number !== newPerson.number) {
      if (window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)){
      
        personService
          .update(comparePersons.id, newPerson)
          .then(returnedPerson => {
            
            setPersons(persons.map(person => person.id !== returnedPerson.id ? person:returnedPerson))
            setErrorMessage(`${newPerson.name} is updated`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 3000)
          })
          .catch(err => {
            setErrorMessage(`Information of ${newPerson.name} has already been removed from the server`)
            setPersons(persons.filter(person => person.id !== comparePersons.id))
          })
          setNewName('')
          setNewNumber('')
    }}

    else {
      console.log('this is something else')
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setErrorMessage(`Added ${newPerson.name} `)
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
        })
    }
    }

    const deletePerson = id => {
      const removedPerson = persons.filter(person => person.id === id)[0]
      if (window.confirm(`Delete ${removedPerson.name}`)) {
        personService
          .remove(removedPerson.id)
          .then(() => {
            setPersons(persons => persons.filter(person => person.id !== id))
          })
      }
    }

    return (
      <div>
        <h2>Phonebook</h2>
        <Notification message={errorMessage} />
        <Filter filterprop={filter} handleChange={handleFilter} />
        <h2>Add a New</h2>
        <PersonForm handleSubmit={handleSubmit} newName={newName} handleName={handleNameChange} newNumber={newNumber} handleNumber={handleNumberChange} />
        <h2>Numbers</h2>
        <Persons persons={persons} filter={filter} deletePerson={deletePerson} />
      </div>
    )
  }

  export default App
