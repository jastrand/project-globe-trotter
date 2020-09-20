import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const CountryItem = ({ country }) => {
  return (
    <StyledLink to={`/country/${country.alpha3Code}`}>
      {country.flag && <CountryImage
        src={country.flag}
        alt={country.name} />}
      <CountryName>{country.name}</CountryName>
    </StyledLink>
  )
}

const CountryImage = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
`
const CountryName = styled.h2`
  margin: 1rem;
  font-size: 2rem;

  &&:hover {
    text-decoration: underline;
  }
`
const StyledLink = styled(Link)`
  color: black;
  display: flex;
  padding: 1rem;
  margin: 0.2rem;
  width: 30%;
  text-decoration: none;
`