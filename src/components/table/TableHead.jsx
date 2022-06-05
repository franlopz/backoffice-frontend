import React from 'react'

const TableHead = ({ header }) => {
  return (
    <thead className="sticky top-0 text-sm font-semibold uppercase text-gray-500 bg-gray-50">
      <tr className="font-mono">
        {header?.map((title) => (
          <th className="p-2 whitespace-nowrap text-center" key={title}>
            {title}
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default TableHead
