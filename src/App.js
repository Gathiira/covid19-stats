import React, { useEffect, useState } from 'react';
import './App.css';

import {
  FormControl,
  Select,
  MenuItem,
  Card, CardContent
} from '@material-ui/core';

import InfoBox from './InfoBox';
import Map from './Map';

function App() {

  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('worldwide')

  // https://disease.sh/v3/covid-19/countries
  //  useEffect -- run piece of code based on given condition

  useEffect(() => {
    // async -- send a request, then wait for it, then do sth with info
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((resp) => resp.json())
      .then((data) => {
        const countries = data.map((country)=>(
          {
            name:country.country,
            value:country.countryInfo.iso2
          }));
        setCountries(countries)
      })
    }

    getCountriesData();

  }, [])     // WHEN BLANK THE CODE WITHIN WILL RUN ONLY ONCe and not again

  const onCountryChange = async(event) => {
    const countryCode = event.target.value;
    setCountry(countryCode)
    console.log('country code -----', countryCode);
  }

  return (
    <div className="app">
      <div className="app__left">
        <div className='app__header'>
          <h1>Covid 19 tracker</h1>
          {/* loop through the select */}
          <FormControl className="app__dropdown">
            <Select 
              variant="outlined" 
              value={country}
              onChange={onCountryChange}>
              <MenuItem value='worldwide'>Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>


        <div className="app__stats">
          <InfoBox title="Coronavirus cases" total={207800} cases ={4567} />

          <InfoBox title="Recovered" total={305600} cases ={4567} />

          <InfoBox title="Total" total={24500} cases ={4567} />

        </div>
        

        <div>
          <Map />
        </div>

      </div>

      <Card className="app__right">
        

        <CardContent>
          <h3>Live cases by Country</h3>
          {/* table */}

          <h3>Worldwide new cases</h3>
          {/* graph */}
          
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
