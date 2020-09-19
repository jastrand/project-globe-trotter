import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCountryList } from 'reducers/countryStore'
import { CountryItem } from 'components/CountryItem'
/*

  1. CountryList will map through all of the items from the redux country array.
  2. The values will later be used in a searchBar component.

 */

export const CountryList = () => {
  const dispatch = useDispatch()
  const countries = useSelector((store) => store.countries.countryList)
  const [searchWord, setSearchWord] = useState('');
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    if (countries.length) {
      return;
    }
    dispatch(getCountryList())
  }, [dispatch, countries])

  useEffect(() => {
    setFilteredList(
      countries.filter((country) => country.name.toLowerCase().includes(searchWord.toLowerCase()))
    );
  }, [searchWord, countries]);

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Search country"
          onChange={(e) => setSearchWord(e.target.value)} />
        {filteredList.map((country, i) => (
          <CountryItem key={i} country={country} />
        ))}
      </div>
    </>
  )
}