import React from 'react'
import GetWeatherData from './GetWeather'

const CountryData = ({ country }) => {
  
  return (
      <div>
          <p>Captital: {country.capital}</p>
          <p>Population: {country.population}</p>
          <p>Region: {country.region} - ({country.subregion})</p>
          <h3>Languages:</h3> 
          
          {country.languages.map((language, i) =>
            <ul key={i}>
              <li>{language.name}</li>
            </ul>
            )}
          
          <img src={country.flag} width='150' height='100'alt='{country} flag'/> 

          <h3>Weather in {country.capital}</h3>
          <GetWeatherData capital={country.capital} />
      </div>
  )
}

export default CountryData