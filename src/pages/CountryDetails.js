import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCountryDetails, getCurrency } from 'reducers/countryStore'
import { Converter } from 'components/Converter'

export const CountryDetails = () => {
  const { alpha3Code } = useParams()
  const dispatch = useDispatch()
  const details = useSelector((state) => state.countries.countryDetails)
  const countryCurrency = useSelector((store) => store.countries.currency)
  const currArray = Object.entries(countryCurrency)
  const errorMessage = useSelector((state) => state.countries.errorMessage)
  const itemNotFound = errorMessage === 400 || errorMessage === 404
  const currency = details.currencies

  useEffect(() => {
    dispatch(getCountryDetails(alpha3Code))
  }, [alpha3Code, dispatch]);

  useEffect(() => {
    dispatch(getCurrency())
  }, [dispatch]);

  return (
    <div>
      {details && <div>
        <p>{details.name} {details.capital} {details.population}</p>
        {currency && <Converter
          name={Object.values(currency[0].name)}
          code={Object.values(currency[0].code)}
          details={details}
          currArray={currArray} />}
        {/* eslint-disable */}
      </div>}
      {itemNotFound && <p>Sorry no info about this country. Try another country!</p>}
    </div>
  )
}