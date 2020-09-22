import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCountryDetails, getCurrency } from 'reducers/countryStore'
import { Converter } from 'components/Converter'
import styled from 'styled-components'
import { locationIcon, populationIcon, backIcon, capitalIcon } from 'assets/FontAwesome'

/*

  1. This page is the one dealing with displaying more information about each country.
  2. Dispatch is used to get data from 2 different API enpoints

*/

export const CountryDetails = () => {
  const { alpha3Code } = useParams()
  const dispatch = useDispatch()

  // details returns all country specific data from the redux store
  const details = useSelector((state) => state.countries.countryDetails)

  // allCurrencies return an object including all currencies available on the api
  const allCurrencies = useSelector((store) => store.countries.currency)

  // converting the object into an array
  const currencyArr = Object.entries(allCurrencies)

  // currency are the currency info for each country like curreny name and currency code
  const currency = details.currencies

  /* eslint-disable */
  const numeral = require('numeral')

  // format the population to a more readable number here
  const population = numeral(details.population).format('0.0a')

  // fetching all details about a country. Send alpha3Code into the function as that will determent which country code to look for
  useEffect(() => {
    dispatch(getCountryDetails(alpha3Code))
  }, [alpha3Code, dispatch]);

  // Fetching todays currency rates
  useEffect(() => {
    dispatch(getCurrency())
  }, [dispatch]);

  return (
    <Container>
      <StyledLink to="/">{backIcon} Back</StyledLink>
      {details && <div>
        <Text>{locationIcon} {details.name}, also called {details.nativeName}</Text>
        <Text>{capitalIcon} Capital: {details.capital}</Text>
        <Text>{populationIcon} {population}</Text>
        {currency && <Converter
          name={Object.values(currency[0].name)}
          code={Object.values(currency[0].code)}
          details={details}
          currencyArr={currencyArr} />}
        {/* eslint-disable */}
      </div>}
    </Container>
  )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: 'Poppins', sans-serif;
    padding: 10px;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  text-transform: uppercase; 
  color: #000;
  align-self: flex-start;
  margin: 1.5rem;
  font-size: 2rem;
  font-weight: bold;

  &&:hover {
    text-decoration: underline;
    transform: scale(1.2);
  }
`

export const Text = styled.p`
  font-size: 3rem;
  max-width: 500px;

  @media (max-width: 700px) {
    font-size: 2rem; 
  }
`
