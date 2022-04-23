import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DropDownMenu from './DropDownMenu';
import Divider from './Divider';
import { useLocation } from 'react-router-dom'

const SubMenu = ({ item, index }) => {

    const [subnav, setSubnav] = useState(false)
    const showSubnav = () => setSubnav(!subnav)
    let pathName = useLocation().pathname
    return (
        <>
            {index === 0 ? null : <Divider color='DimGray' opacity='0.2' />}
            <div className='px-2 py-1'>
                <Link to={item.path} onClick={item.action ? item.action : item.subNav && showSubnav} className={`relative flex justify-start items-center p-5 list-none h-8 text-base hover:bg-blue-600 border-l-4 border-transparent hover: rounded-lg ${pathName === item.path ? ' bg-blue-600' : null}`}>
                    <div className='text-white mr-2'>
                        {item.icon}
                    </div>
                    <span className='ml-2'>
                        {item.title}
                    </span>
                    <span className='absolute right-8'>
                        {item.subNav && subnav
                            ? item.iconOpened
                            : item.subNav
                                ? item.iconClosed
                                : null}
                    </span>
                </Link>
                {subnav && item.subNav.map((item, index) => {
                    return <DropDownMenu item={item} key={item.title} index={index} path={pathName} />
                })}
            </div>
        </>
    )
}

export default SubMenu;