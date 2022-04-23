import React from 'react';
import { Link } from 'react-router-dom';
import Divider from './Divider';

const DropdownMenu = ({ item, path, index }) => {

    return (
        <>
            {index === 0 ? null : <Divider color='DimGray' opacity='0.2' />}

            <Link to={item.path} className={`flex justify-start items-center mt-2 p-5 list-none h-6 text-base hover:bg-blue-600 border-l-4 border-transparent rounded-lg ${path === item.path ? 'bg-blue-600' : null}`}>
                <div className='ml-8'>
                    {item.title}
                </div>
            </Link>
        </>
    )
}

export default DropdownMenu;