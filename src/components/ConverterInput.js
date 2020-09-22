import React, { useState } from 'react'
import styled from 'styled-components'
import { Text } from 'pages/CountryDetails'

export const ConverterInput = ({ toNum, currencyArr, code }) => {
  const [convert, setConvert] = useState('')

  // todaysSEK returns array like [SEK, 10.404]
  const todaysSEK = currencyArr.filter((curr) => curr.includes('SEK'))
  // keep only the value here and remove the word "SEK", example: 10.404
  const removeLetters = todaysSEK.toString().substring(4)
  // convert into a number so we can to math with it
  const sekToNumber = Number(removeLetters)

  // Base currency from API is in EUR. This means that all values are based on 1 EUR.
  // 1 EUR divided by todays SEK = how many SEK by each EUR
  // Take the result and multiply by the input value (convert)
  // Lastly multiply with toNum (the country currency you are currently on)

  const calculateAmount = () => {
    return (1 / sekToNumber) * convert * toNum
  }

  // constant invokes the calucateAmount function and limit result to 2 decimals
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
