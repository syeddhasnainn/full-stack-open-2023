import axios from "axios"
import { useState } from "react";

const SingleCountry = ({filterCountries}) => {
    const [weatherData, setWeatherData] = useState({})

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${filterCountries.capital}&appid=${process.env.REACT_APP_API_KEY}`)
    .then(response => setWeatherData(response.data))

    const temperature = weatherData.main.temp - 273.15
    const windSpeed = weatherData.wind.speed

    return(
        <>    
        <h1>{filterCountries.name}</h1>
        <p>capital {filterCountries.capital}</p>
        <p>area {filterCountries.area}</p>
        <h2>languages:</h2>
        <ul>{Object.values(filterCountries.languages).map(language =><li>{language}</li>)}</ul>
        <div><img src={filterCountries.flags.png} alt=''></img></div>
        <h2>weather in {filterCountries.name}</h2>
        <div>temperature {temperature}</div>
        <div>wind {windSpeed}</div>
        </>
    )
}

export default SingleCountry