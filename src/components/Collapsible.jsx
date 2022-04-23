import React, { useState } from 'react'
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';

const Collapsible = ({ children, title, hidden }) => {

    const [isOpen, setIsOpen] = useState(false);

    const handleOpening = () => {
        setIsOpen((state) => !state);
    };

    return (
        <div hidden={hidden} className='p-2shadow-sm border rounded-md border-[#37aaf7]'>
            <div className="p-3 border-bottom flex justify-content-between">
                <h6 className='text-sm text-[#6f81a5]'>{title}</h6>
                <button type="button" className='text-[#6f81a5]' onClick={handleOpening}>
                    {!isOpen ? (
                        <RiArrowDownSLine />
                    ) : (
                        <RiArrowUpSLine />
                    )}
                </button>
            </div>
            <div className="border-bottom">
                <div>{isOpen && <div className="p-3">{children}</div>}</div>
            </div>
        </div>
    )
}

export default Collapsible