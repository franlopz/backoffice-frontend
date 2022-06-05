import React from 'react'

const rowsOption = [15, 25, 50, 100, 250, 500, 1000]

const SelectRowsPerPage = ({ rowsPerPage, setRowsPerPage }) => {
  return (
    <div className="flex flex-row text-sm mt-2">
      <select
        value={rowsPerPage}
        onChange={(e) => setRowsPerPage(e.target.value)}
      >
        {rowsOption.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>
      <p>filas por página</p>
    </div>
  )
}

export default SelectRowsPerPage
