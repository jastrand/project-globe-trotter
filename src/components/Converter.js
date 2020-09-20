import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getCurrency } from 'reducers/countryStore'
import { ConverterInput } from 'components/ConverterInput'

export const Converter = ({ code, name, currArray }) => {
  const dispatch = useDispatch()
  const codeToString = code.toString().split(',').join('')
  const filiteredArray = currArray.filter((curr) => curr.includes(codeToString))
  const arr = filiteredArray.toString().substring(4)
  const toNum = Number(arr)
  console.log(currArray)
  const todaysEuro = currArray.filter((curr) => curr.includes('EUR'))
  console.log(todaysEuro)

  useEffect(() => {
    dispatch(getCurrency())
  }, [dispatch]);

  return (
    <div>
      <p>{name} {code}</p>
      <p>{toNum}</p>
      <ConverterInput toNum={toNum} />
    </div>
  )
}