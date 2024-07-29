import React from 'react'
import * as Icons from 'react-icons/vsc'
// import { useDispatch } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';

const SidebarLink = ({link, iconName}) => {
    const Icon = Icons[iconName];
    
    const location = useLocation();
    // const dispatch = useDispatch();

    const matchroute = (route)=>{
        return location.pathname === route
    }

  return (
    <div className={`relative  ${matchroute(link.path) ? 'bg-yellow-800'  : 'bg-opacity-0'} py-2 lg:px-4 px-1   `}>
        <NavLink
            to={link.path}
            className={`  text-sm font-medium  `}
        >
            <span className={`absolute   left-0 top-0 h-full w-[0.2rem] bg-yellow-50 
                                ${matchroute(link.path) ? 'opacity-100' : 'opacity-0'} `}
            >


            </span>

            <div className='flex gap-2 ab'>
                <Icon className="text-lg"/>
                <span className='text-xs'>{link.name}</span>
            </div>
        </NavLink>
    </div>
  )
}

export default SidebarLink