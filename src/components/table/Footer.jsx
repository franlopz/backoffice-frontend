import React from 'react'

const buttonStyle = 'bg-gray-400 w-6 h-6 rounded-sm m-1 text-white'
const Footer = ({ page, pagesNumber, setPage, dataLength }) => {
  const increase = () => {
    if (page < pagesNumber) setPage(++page)
  }
  const decrease = () => {
    if (page >= 2) setPage(--page)
  }
  if (dataLength === 0) return null
  return (
    <div className="flex flex-row gap-2 mx-2 text-sm justify-between h-12 items-center">
      <div>{`Página ${page} de ${[pagesNumber]}`}</div>
      <p>{dataLength} Registros</p>
      <div>
        <button className={buttonStyle} onClick={() => decrease()}>
          {'<'}
        </button>
        <button className={buttonStyle} onClick={() => increase()}>
          {'>'}
        </button>
      </div>
    </div>
  )
}

export default Footer
