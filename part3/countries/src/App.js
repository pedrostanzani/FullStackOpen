import { useState, useEffect } from 'react';
import axios from 'axios';

const Capital = ({ countryData }) => {
  const capitalArr = countryData.capital;

  if (capitalArr.length === 1) {
    return <div>capital: {capitalArr[0]}</div>;
  } else if (capitalArr === 0) {
    return <div>n/a</div>;
  } else {
    return <div>capital cities: {capitalArr.join(', ')}</div>;
  }
}

const CountryData = ({ countryData }) => {
  const languages = Object.values(countryData.languages);
  const bold = { fontWeight: 'bold' };

  const name = countryData.name.common;

  return (
    <>
      <h2>{name}</h2>
      <Capital countryData={countryData} />
      <div>area: {countryData.area}</div>
      <p style={bold}>languages:</p>
      <ul>
        {languages.map(l => <li key={l}>{l}</li>)}
      </ul>
      <img src={countryData.flags.png} alt={`Flag of ${name}.`} />
    </>
  )
}

const SearchResults = ({ countries, query }) => {
  const showCountries = countries.filter(country => {
    let name  = country.name.common.toLowerCase();
    return name.includes(query.toLowerCase());
  });

  if (showCountries.length > 10) {
    return <p>Too many matches, please specify another filter.</p>
  } else if (showCountries.length === 0) {
    return <p>No matches found.</p>
  } else if (showCountries.length === 1) {
    return <CountryData countryData={showCountries[0]} />
  } else {
    return (
      <ul>
        {showCountries.map(country => <li key={country.name.common}>{country.name.common}</li>)}
      </ul>
    )
  }
}

const App = () => {
  const [query, setQuery] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
       const data = response.data;
       setCountries(data);
    });
  }, [])

  const handleInput = (event) => { setQuery(event.target.value); }

  return (
    <>
    <div>
      find countries: 
      <input type="text" value={query} onChange={handleInput} />
    </div>
    <SearchResults countries={countries} query={query} />
    </>
  );
}

export default App;