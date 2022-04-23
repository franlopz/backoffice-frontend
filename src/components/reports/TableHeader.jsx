import React from 'react'

const TableHeader = ({ business, period, title }) => {

    return (

        <tr>
            <td colSpan={2} className='text-black table-cell text-center'>
                <b>
                    <h2>{business}</h2>
                    <h2>{title}</h2>
                    <h2>{period}</h2>
                </b>
            </td>
        </tr >
    )
}

export default TableHeader