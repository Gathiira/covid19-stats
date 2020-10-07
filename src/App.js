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
import Table from "./Table"
import { sortData } from './utils';
import LineGraph from './LineGraph'



function App() {

  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('worldwide')
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData, setTableData] = useState([])

  // https://disease.sh/v3/covid-19/countries
  //  useEffect -- run piece of code based on given condition

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
    .then(res => res.json())
    .then(data => {
      setCountryInfo(data);
    })
  }, [])

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


        const sortedData = sortData(data)
        setTableData(sortedData)
        setCountries(countries)
      })
    }

    getCountriesData();

  }, [])     // WHEN BLANK THE CODE WITHIN WILL RUN ONLY ONCe and not again

  const onCountryChange = async(event) => {
    const countryCode = event.target.value;

    // https://disease.sh/v3/covid-19/countries/{county_code}
    // https://disease.sh/v3/covid-19/all

    const url = countryCode ==="worldwide" 
      ? 'https://disease.sh/v3/covid-19/all' :
      `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
    .then(resp => resp.json())
    .then(data => {
      setCountry(countryCode)

      // all data from the country response
      setCountryInfo(data);
    } )

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
          <InfoBox title="Coronavirus cases" total={countryInfo.cases} cases ={countryInfo.todayCases} />

          <InfoBox title="Recovered" total={countryInfo.recovered} cases ={countryInfo.todayRecovered} />

          <InfoBox title="Deaths" total={countryInfo.deaths} cases ={countryInfo.todayDeaths} />

        </div>
        

        <div>
          <Map />
        </div>

      </div>

      <Card className="app__right">
        

        <CardContent>
          <h3>Cases by Country</h3>
          {/* table */}

          <Table countries={tableData} />

          <h3>Worldwide new cases</h3>

          {/* graph */}
          <LineGraph />

        </CardContent>
      </Card>
    </div>
  );
}

export default App;
