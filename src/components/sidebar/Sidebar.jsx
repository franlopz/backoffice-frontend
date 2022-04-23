import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as RiIcons from "react-icons/ri";
import SidebarData from './SidebarData'
import SubMenu from './SubMenu'


const Sidebar = () => {

    const [sidebar, setSidebar] = useState(false)
    const showSidebar = () => setSidebar(!sidebar)

    return (
        <>
            <div className='absolute w-full bg-gray-900 h-12 flex justify-start items-center lg:-top-full lg:-mt-12' >
                <Link onClick={showSidebar} className='ml-4 my-8  h-8 w-8' to='#'>
                    <RiIcons.RiMenuLine  className='text-3xl h-8 flex justify-start items-center text-white' />
                </Link>
            </div>
            <nav className={`fixed transition-all z-10 bg-gray-900 w-60 h-full  flex  top-0 ${sidebar ? 'left-0' : '-left-full'}  overflow-y-auto lg:left-0`}>
                <div className='w-full text-white'>
                    <Link to='#' className='text-white lg:invisible'>
                        <RiIcons.RiArrowLeftCircleFill onClick={showSidebar} className='absolute text-3xl h-8 mt-2 mb-2 right-2 text-white' />
                    </Link>
                    <div className='mt-12'>
                        {SidebarData.map((item, index) => {
                            return <SubMenu item={item} key={index} index={index} />;
                        })}
                    </div>
                </div>
            </nav>
        </>

    )
}

export default Sidebar;