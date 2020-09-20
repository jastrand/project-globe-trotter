import React from 'react'

export const ConverterInput = ({ toNum }) => {
  const handleOnClick = () => {
    console.log('Hello you!')
  }

  console.log(typeof toNum)

  return (
    <div>
      <input
        type="text"
        placeholder="convert" />
      <button type="button" onClick={handleOnClick}>Convert</button>
    </div>
  )
}