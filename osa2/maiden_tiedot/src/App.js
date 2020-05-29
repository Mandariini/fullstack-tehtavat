import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CountryWindow = ({ country }) => {
    return (
        <div>
            <h1>{country.name}</h1>
            <div>capital {country.capital}</div>
            <div>population {country.population}</div>
            <h2>languages</h2>
            <ul>
                {country.languages.map(language =>
                    <li key={language.name} >
                        {language.name}
                    </li>
                )}
            </ul>
            <img src={country.flag} width='150' alt='' />
        </div>
    )
}

const ShowFilteredCountries = (props) => {
    var filteredCountries = props.countries.filter(country => country.name.toLowerCase().includes(props.filter.toLowerCase()))

    if (filteredCountries.length === 1) {
        return (
            <CountryWindow country={filteredCountries[0]} />
        )
    }

    else if (filteredCountries.length <= 10) {
        return (
            filteredCountries.map(country =>
                <div key={country.name} >
                    {country.name}
                </div>
            )
        )
    }
    else {return <div> Too many matches, specify another filter </div>}
}

const App = () => {
    const [countries, setCountries] = useState([])
    const [filter, setFilter] = useState('')

    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data)
            })
    }, [])

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }


    return (
        <div>
            <div>find countries <input value={filter} onChange={handleFilterChange} /></div>
            <ShowFilteredCountries countries={countries} filter={filter} />
        </div>
    )

}

export default App