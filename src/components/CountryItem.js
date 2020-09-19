import React from 'react'
import { Link } from 'react-router-dom'

export const CountryItem = ({ country }) => {
  return (
    <div>
      <Link to={`/country/${country.alpha3Code}`}>
        <p>{country.name}</p>
      </Link>
    </div>
  )
}