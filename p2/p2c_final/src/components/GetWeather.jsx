import React, { useState, useEffect } from 'react'
import axios from 'axios'

const GetWeatherData = ({ capital }) => {
    const [weatherData, setWeatherData] = useState ({})

    useEffect(() => {
        const api_key = process.env.REACT_APP_NOT_SECRET_CODE

        if (capital) {
            axios
                .get('http://api.weatherstack.com/current?access_key=' + api_key + '&query=' + capital)
                .then(response => {
                    console.log('weather promise fulfilled')
                    setWeatherData(response.data.current)
                })
        }
    }, [capital])

    return (
        <div>
            <p>Temperature: {weatherData.temperature} &deg;C</p>
            <p>{weatherData.weather_descriptions}</p>
            <img src={weatherData.weather_icons} alt='weather_icon'></img>
        </div>
    )
}

export default GetWeatherData