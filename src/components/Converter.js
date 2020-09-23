import React from 'react'
import { ConverterInput } from 'components/ConverterInput'
import { coinIcon } from 'assets/FontAwesome'
import { Text } from 'pages/CountryDetails'

export const Converter = ({ code, name, currencyArr }) => {
  // the variable "code" returns [E,U,R] so change it back to string here:
  const codeToString = code.toString().split(',').join('')

  // filter the entire array of all daily currencies to include only the one we are currently on
  const filiteredArray = currencyArr.filter((curr) => curr.includes(codeToString))

  // filiteredArray returns example: [SEK, 10.404] so keep only the number:
  const arr = filiteredArray.toString().substring(4)

  // format to a number in order to do some math
  const toNum = Number(arr)

  return (
    <div>
      <Text>{coinIcon} {code}/{name}</Text>
      <ConverterInput code={code} toNum={toNum} currencyArr={currencyArr} />
    </div>
  )
}