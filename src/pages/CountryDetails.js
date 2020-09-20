import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCountryDetails, getCurrency } from 'reducers/countryStore'
import { Converter } from 'components/Converter'
import styled from 'styled-components'
import { locationIcon, populationIcon, backIcon, capitalIcon } from 'assets/FontAwesome'

export const CountryDetails = () => {
  const { alpha3Code } = useParams()
  const dispatch = useDispatch()
  const details = useSelector((state) => state.countries.countryDetails)
  const allCurrencies = useSelector((store) => store.countries.currency)
  const currencyArr = Object.entries(allCurrencies)
  const currency = details.currencies
  /* eslint-disable */
  const numeral = require('numeral')
  const changer = numeral(details.population).format('0.0a')

  useEffect(() => {
    dispatch(getCountryDetails(alpha3Code))
  }, [alpha3Code, dispatch]);

  useEffect(() => {
    dispatch(getCurrency())
  }, [dispatch]);

  return (
    <Container>
      <StyledLink to="/">{backIcon} Back</StyledLink>
      {details && <div>
        <Text>{locationIcon} {details.name}, also called {details.nativeName}</Text>
        <Text>{capitalIcon} Capital: {details.capital}</Text>
        <Text>{populationIcon} {changer}</Text>
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
  margin: 2rem;
  font-size: 2rem;
  font-weight: bold;

  &&:hover {
    text-decoration: underline;
    transform: scale(1.2);
  }
`

export const Text = styled.p`
  font-size: 3rem;

  @media (max-width: 700px) {
    font-size: 2rem; 
  }
`
