import React from 'react'

const TableRow = ({ isHeader = false, title, value, isTotal = false }) => {

    return (
        <>
            {isHeader ? <tr className=' bg-gray-300 indent-1'>
                {!isTotal ?
                    <td colSpan={2} className=' table-cell'>
                        <b>{title}</b>
                    </td> :
                    <>
                        <td className='table-cell'>
                            <b>{title}</b>
                        </td>
                        <td className='table-cell '>
                            <b>
                                <p className='text-right'>{value}</p>
                            </b>
                        </td>
                    </>
                }
            </tr> :
                <tr className='bg-gray-100  indent-3 '>
                    <td>
                        <p>{title}</p>
                    </td>
                    <td>
                        <p className='text-right'>{value}</p>
                    </td>
                </tr>
            }
        </>
    )
}

export default TableRow