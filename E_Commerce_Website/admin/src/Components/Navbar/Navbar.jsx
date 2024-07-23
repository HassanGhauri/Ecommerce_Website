/* eslint-disable no-unused-vars */
import React from 'react'
import './Navbar.css'
import { CgProfile } from "react-icons/cg";
import { FaShopify } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
const Navbar = () => {
  return (
    <div className='navbar'>
        <div className='nav-logo'>
            <span><FaShopify/></span>
            <div  className='nav-title'>
                <p className='p1'>Shop Inn</p>
                <p className='p2'>(Admin panel)</p>
            </div>
        </div>
        <div className='nav-profile'>
            <span ><CgProfile/></span>
            <span ><IoIosArrowDown/></span>
        </div>
        
    </div>
  )
}

export default Navbar