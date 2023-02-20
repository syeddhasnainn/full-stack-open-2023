import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import SingleCountry from "./components/SingleCountry"

function App() {
  const [countries, setCountries] = useState([])
  const [query, setQuery] = useState('')
  const [showCountries, setShowCountries] = useState({})
  
  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
    .then(response => setCountries(response.data.map(({name,capital, languages, area,flags}) => ({
      name:name.common,
      area,
      capital,
      languages,
      flags})
      )))
  },[])

  const handleChange = e => {
    setQuery(e.target.value)
    setShowCountries({})
  }

  const handleShow = name => () => setShowCountries(filterCountries.filter(country => country.name.includes(name))[0]) 

  const filterCountries = countries.filter(country => country.name.toLowerCase().includes(query))
  
  return (
    <div>
      find countries <input value={query} onChange={handleChange}></input>
      {filterCountries.length === 1 ? <SingleCountry filterCountries={filterCountries[0]}/>:null}
      {filterCountries.length > 10 ? <div>Too many matches, specify another filter</div> :
      filterCountries.map(
        list => {
          return(
          <div>
          <li>{list.name} <button onClick={handleShow(list.name)}>show</button></li>
        </div>
        )}) 
        }

      {showCountries.name && <SingleCountry filterCountries={showCountries}/>}
    </div>

  )
}

export default App;
