import { createSlice } from '@reduxjs/toolkit'

/*

1. This reducer will store the country and currency values from the API's.
2. A list of countries will be availale and will be populated by the payload from thunks.
3. First thunk will fetch a complete list of countries
4. Secong thunk will fetch details about each country with help from useParams.
5. Third thunk will fetch the latest currency exchange from each country.

*/

export const countries = createSlice({
  name: 'countries',
  initialState: {
    countryList: [],
    countryDetails: {},
    errorMessage: {}
  },
  reducers: {
    setCountryList: (state, action) => {
      state.countryList = action.payload
    },
    setCountryDetails: (state, action) => {
      state.countryDetails = action.payload
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload
    }
  }
})

export const getCountryList = () => {
  const COUNTRY_URL = 'https://restcountries.eu/rest/v2/all'
  return (dispatch) => {
    fetch(COUNTRY_URL)
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        throw new Error(`Could not fetch list of countries, ${res.status}`)
      })
      .then((json) => {
        dispatch(countries.actions.setCountryList(json))
        console.log(json)
        console.log(json.length)
        console.log(json.body)
      })
  }
}

export const getCountryDetails = (alpha3Code) => {
  const DETAILS_URL = `https://restcountries.eu/rest/v2/alpha/${alpha3Code}`
  return (dispatch) => {
    fetch(DETAILS_URL)
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          dispatch(countries.actions.setErrorMessage(res.status))
        }
      })
      .then((json) => {
        dispatch(countries.actions.setCountryDetails(json))
        console.log(json)
      })
  }
}

