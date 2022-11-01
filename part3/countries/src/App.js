import { useState, useEffect } from "react"
import axios from 'axios';

const SearchBar = (props) => {
  return (
    <div>
      find countries
      <input type="text" value={props.query} onChange={props.onChange} />
    </div>
  )
}

const Capital = ({ capitalCities }) => {
  const length = capitalCities.length;

  if (length === 1) { return <div>capital: {capitalCities[0]}</div>; } 
  if (length === 0) { return <div>n/a</div>; }
  return <div>capital cities: {capitalCities.join(', ')}</div>;
}

const CountryData = ({ country }) => {
  const name = country.name.common;
  const languages = Object.values(country.languages);

  return (
    <>
      <h2>{name}</h2>
      <Capital capitalCities={country.capital} />
      <div>area: {country.area}</div>
      <p style={{fontWeight: 'bold'}}>languages:</p>
      <ul>
        {languages.map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={country.flags.png} alt={`Flag of ${name}.`} />
    </>
  )
}

const Results = (props) => {
  const length = props.countries.length;

  if (length > 10) {
    return (<p>Too many matches, please specify another filter.</p>);
  } else if (length === 0) {
    return (<p>No matches found.</p>);
  } else if (length === 1) {
    return <CountryData country={props.countries[0]} />
  } else {
    return (
      <ul>
        {props.countries.map(country => {
          const name = country.name.common;
          return (
            <li key={name}>
              {name}
              <button value={name} onClick={() => props.onClick(name)}>show</button>
            </li>
          );
        })}
      </ul>
    )
  }
}

const App = () => {
  // State
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [showCountries, setShowCountries] = useState([]);

  // Effect hook
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        const data = response.data;
        setData(data);
      });
  }, [])

  // Helpers
  const filterCountries = (newQuery) => {
    return data.filter(country => {
      const name = country.name.common.toLowerCase();
      return name.includes(newQuery.toLowerCase());
    });
  }

  // Event handlers
  const handleChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    setShowCountries(filterCountries(newQuery));
  };

  const handleClick = (name) => {
    setShowCountries(filterCountries(name));
  }

  return (
    <>
      <SearchBar query={query} onChange={handleChange} />
      <Results countries={showCountries} onClick={handleClick} />
    </>
  )
}

export default App;