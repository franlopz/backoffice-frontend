import React from 'react'
import useTableData from '../../hooks/useTableData'
import Footer from './Footer'
import SelectRowsPerPage from './SelectRowsPerPage'
import TableHead from './TableHead'
import TableRows from './TableRows'

const Table = ({
  data = [],
  title = '',
  square = true,
  showHeader = null,
  columnsToShow = [],
  withMaxHeight = false,
  buttons = [],
  heigth = 'h-full',
}) => {
  const [
    header,
    pageData,
    pagesNumber,
    page,
    rowsPerPage,
    setRowsPerPage,
    setPage,
  ] = useTableData({
    initialData: data,
    showHeader: showHeader,
  })
  return (
    <div
      className={` m-2 bg-white ${
        withMaxHeight
          ? 'h-full'
          : `aspect-square ${square ? 'sm:aspect-square' : 'sm:aspect-[2/1]'}`
      }`}
    >
      <div className={`flex flex-col shadow-lg rounded-lg border ${heigth}`}>
        <header className="px-5 py-4 border-b border-gray-100">
          <p className="font-bold text-gray-600 text-xs text-center">{title}</p>
          <SelectRowsPerPage
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
          />
        </header>
        <div className="px-3 overflow-y-auto overflow-x-auto h-full">
          {pageData.length > 0 ? (
            <table className="table-auto w-full ">
              <TableHead header={header} />
              <tbody className="text-sm divide-y divide-gray-100">
                <TableRows
                  columnsToShow={columnsToShow}
                  pageData={pageData}
                  buttons={buttons}
                />
              </tbody>
            </table>
          ) : (
            <div className="flex justify-center items-center h-full">
              <p className="">Sin datos</p>
            </div>
          )}
        </div>
        <Footer
          page={page}
          pagesNumber={pagesNumber}
          setPage={setPage}
          dataLength={data.length}
        />
      </div>
    </div>
  )
}

export default Table
