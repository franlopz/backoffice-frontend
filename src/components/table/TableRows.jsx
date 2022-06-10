import React from 'react'

const TableRows = ({
  pageData,
  columnsToShow,
  buttons = null,
  page,
  rowsPerPage,
}) => {
  return (
    <>
      {pageData?.map((rows, index) => {
        return (
          <tr key={index} className="hover:bg-slate-200">
            {buttons && (
              <td key={rows.id} className="flex justify-center items-center">
                {buttons.map((button) =>
                  button({
                    rows: rows,
                    index: index,
                    rowId: rows.id,
                    page: page,
                    rowsPerPage: rowsPerPage,
                  })
                )}
              </td>
            )}
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
          </tr>
        )
      })}
    </>
  )
}

export default TableRows
