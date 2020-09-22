import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCountryList } from 'reducers/countryStore'
import { CountryItem } from 'components/CountryItem'
import styled from 'styled-components'
import search from 'assets/search.svg';
/*

  1. CountryList will map through all of the items from the redux country array.
  2. Text Input with help from useState will let the user search for a country
  3. The mapped values can then be used in the component called CountryItem.

 */

export const CountryList = () => {
  const dispatch = useDispatch()
  const countries = useSelector((store) => store.countries.countryList)
  const [searchWord, setSearchWord] = useState('');
  const [filteredList, setFilteredList] = useState([]);

  // fetch all the countries after render if empty array.
  // If countries are already fetched only return to optimize page load and speed.

  useEffect(() => {
    if (countries.length) {
      return;
    }
    dispatch(getCountryList())
  }, [dispatch, countries])

  // filiter the list of countries depending on the searchWord state
  // toLowerCase so users can search both in upper- and lowercase.
  useEffect(() => {
    setFilteredList(
      countries.filter((country) => country.name.toLowerCase().includes(searchWord.toLowerCase()))
    )
  }, [searchWord, countries]);

  return (
    <>
      <Section>
        <TextWrapper>
          <Title>Hey Globetrotter <span role="img" aria-label="Globe">🌎</span> </Title>
          <SubTitle>Where are you going next?</SubTitle>
        </TextWrapper>
        <Input
          type="text"
          placeholder="Search country"
          onChange={(e) => setSearchWord(e.target.value)} />
        {filteredList.map((country, i) => (
          <CountryItem key={i} country={country} />
        ))}
      </Section>
    </>
  )
}

const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center;
`
const TextWrapper = styled.section`
  height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Poppins', sans-serif;
`

const Title = styled.h1`
  font-size: 5rem;
  margin: 0;
  padding: 2rem;

  @media (max-width: 700px) {
    font-size: 2rem; 
  }
`
const SubTitle = styled.h1`
  font-size: 3rem;
  margin: 0;
  padding: 2rem;

  @media (max-width: 700px) {
    font-size: 2rem; 
  }
`

const Input = styled.input`
  width: 40%;
  padding: 1rem;
  background-color: whitesmoke;
  border: none;
  border-radius: 22px;
  height: 2rem;
  font-size: 2rem;
  margin-bottom: 3rem;
  background-image: url(${search});
  background-position: 10px 10px;
  background-repeat: no-repeat;
  padding-left: 40px;

  &&:textarea {
    padding: 1rem;
  }

  &&:focus {
    box-shadow: 0 0 3pt 2pt grey;
    outline: none;
  }

  @media (max-width: 700px) {
    width: 60%;
  }
`