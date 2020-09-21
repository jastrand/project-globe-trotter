import React, { useState } from 'react'
import styled from 'styled-components'
import { Text } from 'pages/CountryDetails'

export const ConverterInput = ({ toNum, currencyArr, code }) => {
  const [convert, setConvert] = useState('')
  const todaysSEK = currencyArr.filter((curr) => curr.includes('SEK'))
  const removeLetters = todaysSEK.toString().substring(4)
  const sekToNumber = Number(removeLetters)

  // base currency  from API is EUR, so convert the number into SEK here:
  // 1 EUR divided by todays SEK. Multiply with user input and multiply with the current currency
  const calculateAmount = () => {
    return (1 / sekToNumber) * convert * toNum
  }

  // invoke the calculateAmount function with this constant, and limit to 2 decimals
  const convertedSEK = calculateAmount().toFixed(2)

  return (
    <div>
      <Input
        type="number"
        placeholder="Enter SEK"
        value={convert}
        onChange={(e) => setConvert(e.target.value)} />
      <Text>{convert} SEK is {convertedSEK} {code}</Text>
    </div>
  )
}

const Input = styled.input`
  width: 50%;
  height: 4rem;
  border: none;
  border-radius: 22px;
  padding-left: 15px;

  &&:focus {
    box-shadow: 0 0 3pt 2pt grey;
    outline: none;
  }
`
