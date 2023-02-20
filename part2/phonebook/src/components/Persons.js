const Persons = ({persons, filter, deletePerson}) => {

    return persons
    .filter(person => person.name.toLowerCase().includes(filter))
    .map(person => (
      <li>
        {person.name} {person.number}
        <button onClick={() =>deletePerson(person.id)}>Delete</button>
      </li>))
      
}

export default Persons