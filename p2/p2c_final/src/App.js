import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CountryData from './components/CountryData'

const App = () => {
  
  const[countries, setCountries] = useState([])
  const [search, setSearch] = useState([])
  const [searchText,setSearchText] = useState('')
  const [showData, setShowData] = useState(false)
  
  useEffect(() => {
    console.log('effect')
    
    if (searchText) {
      axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => {
          console.log('countries promise fulfilled')
          setCountries(response.data)
        })
      }
  }, [searchText])
  
  const handleChange = (event) => {
    setSearchText(event.target.value)
    
    const searchResult = countries.filter(country => 
      country.name.includes(searchText))
    
    setSearch(searchResult)

    if (search.length === 1) {
      setShowData({showData: !showData})

      }
  }

  return (
    <div>
      find countries with <input type='text' value={searchText} onChange={handleChange}></input>
      <div>
        {search.map((country, i) => 
          <div key={i}>
            <h2>{country.name}</h2> 

            {showData && 
            <CountryData country={country} /> }   

          </div>
        )}
      </div>
    </div>
  )
}

export default App 