import React from "react"
import usePurchases from "../hooks/usePurchases"
import useTableData from "../hooks/useTableData"

const Table = ({
  data = [],
  title = "",
  square = true,
  showHeader = null,
  columnsToShow = [],
  withMaxHeight = false,
  setRows,
  activateActions = false,
  buttons = [],
  heigth = "h-full",
}) => {
  const [header] = useTableData({ initialData: data, showHeader: showHeader })

  return (
    // <div className={` m-2 bg-white ${withMaxHeight ? '' : `aspect-square ${square ? 'md:aspect-square' : 'md:aspect-[2/1]'}`}`}>
    <div
      className={` m-2 bg-white ${
        withMaxHeight
          ? "h-full"
          : `aspect-square ${square ? "md:aspect-square" : "md:aspect-[2/1]"}`
      }`}
    >
      <div className={`flex flex-col shadow-lg rounded-lg  border ${heigth}`}>
        <header className="px-5 py-4 border-b border-gray-100">
          <p className="font-bold text-gray-600 text-xs text-center">{title}</p>
        </header>
        <div className="p-3 overflow-y-auto overflow-x-auto h-full">
          {data.length > 0 ? (
            <table className="table-auto w-full ">
              <thead className=" text-sm font-semibold uppercase text-gray-500 bg-gray-50">
                <tr className="font-mono">
                  {header?.map((title) => (
                    <th
                      className="p-2 whitespace-nowrap text-center"
                      key={title}
                    >
                      {title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100">
                {data?.map((rows, index) => {
                  return (
                    <tr key={index}>
                      {Object.values(rows).map((val, index) => {
                        if (
                          columnsToShow.length > 0
                            ? columnsToShow.includes(Object.keys(rows)[index])
                            : []
                        )
                          return (
                            <td
                              className={`p-2 whitespace-nowrap ${
                                isNaN(val) ? "text-left" : "text-center"
                              }`}
                              key={index}
                            >
                              {val}
                            </td>
                          )
                      })}
                      {
                        <td key={rows.id}>
                          {buttons.map((button) =>
                            button(rows, index, rows?.id)
                          )}
                        </td>
                      }
                    </tr>
                  )
                })}
              </tbody>
            </table>
          ) : (
            <div className="flex justify-center items-center h-full">
              <p className="">Sin datos</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Table
