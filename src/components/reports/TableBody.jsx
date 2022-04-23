import React from 'react'

const TableBody = ({ children }) => {

    return (
        <table className='table border-separate box-border w-5/6 max-w-lg'> 
            <tbody className='table-row-group align-middle'>
                {children}
            </tbody>
        </table>
    )
}

export default TableBody