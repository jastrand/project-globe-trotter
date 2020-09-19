import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCountryList } from 'reducers/countryStore'
/*

  1. CountryList will map through all of the items from the redux country array.
  2. The values will later be used in a searchBar component.

 */

export const CountryList = () => {
  const dispatch = useDispatch()
  const countries = useSelector((store) => store.countries.countryList)
  console.log(countries)

  useEffect(() => {
    if (countries.length) {
      return;
    }
    dispatch(getCountryList())
  }, [dispatch, countries])

  return (
    <div>
      {countries &&
        <div>
          {countries.map((country, i) => (
            <p key={i}>{country.name}</p>
          ))}
        </div>
      }
    </div>
  )
}