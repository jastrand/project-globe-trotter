import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCountryDetails } from 'reducers/countryStore'

export const CountryDetails = () => {
  const { alpha3Code } = useParams()
  const dispatch = useDispatch()
  const details = useSelector((state) => state.countries.countryDetails)
  const errorMessage = useSelector((state) => state.countries.errorMessage)
  const itemNotFound = errorMessage === 400

  useEffect(() => {
    dispatch(getCountryDetails(alpha3Code))
  }, [alpha3Code, dispatch]);

  console.log(details)

  return (
    <div>
      {details && <p>{details.name}</p>}
      {itemNotFound && <p>Sorry no info about this country. Try another country!</p>}
    </div>
  )
}