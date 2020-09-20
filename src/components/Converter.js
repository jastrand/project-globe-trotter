import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getCurrency } from 'reducers/countryStore'
import { ConverterInput } from 'components/ConverterInput'
import { coinIcon } from 'assets/FontAwesome'
import { Text } from 'pages/CountryDetails'

export const Converter = ({ code, name, currencyArr }) => {
  const dispatch = useDispatch()
  const codeToString = code.toString().split(',').join('')
  const filiteredArray = currencyArr.filter((curr) => curr.includes(codeToString))
  const arr = filiteredArray.toString().substring(4)
  const toNum = Number(arr)

  useEffect(() => {
    dispatch(getCurrency())
  }, [dispatch]);

  return (
    <div>
      <Text>{coinIcon} {code}/{name}</Text>
      <ConverterInput code={code} toNum={toNum} currencyArr={currencyArr} />
    </div>
  )
}