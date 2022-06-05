import React from 'react'

const TableRows = ({ pageData, columnsToShow, buttons }) => {
  return (
    <>
      {pageData?.map((rows, index) => {
        return (
          <tr key={index}>
            {columnsToShow.map((column) => {
              return (
                <td
                  className={`p-2 whitespace-nowrap ${
                    isNaN(rows[column]) ? 'text-left' : 'text-center'
                  }`}
                  key={rows[column] + column}
                >
                  {rows[column]}
                </td>
              )
            })}
            {
              <td key={rows.id}>
                {buttons.map((button) => button(rows, index, rows?.id))}
              </td>
            }
          </tr>
        )
      })}
    </>
  )
}

export default TableRows
