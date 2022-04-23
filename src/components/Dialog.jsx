import React, { useState } from 'react'
import { RiCloseCircleLine } from 'react-icons/ri'

const Dialog = ({ children, title, isOpen, handleClosingDialog, fullScreen = false }) => {

    return (
        isOpen &&
        <div className='fixed bg-gray-800/50  h-full w-full z-10 flex justify-center items-center'>
            <div className={`${fullScreen ? 'h-full' : 'max-w-md  mx-4 rounded-lg'} w-full z-30 border bg-white opacity-100 shadow-md p-4`}>
                <div className='flex justify-between p-0.5'>
                    <h3 className='px-2 font-semibold'>{title}</h3>
                    <button onClick={handleClosingDialog}>
                        <RiCloseCircleLine className=' text-red-600 w-6 h-6 relative -right-2 -top-3' />
                    </button>
                </div>
                {children}
            </div>
        </div>
    )
}

export default Dialog