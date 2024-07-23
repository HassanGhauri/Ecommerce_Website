/* eslint-disable no-unused-vars */
import React from 'react'
import './Sidebar.css'
import {Link} from 'react-router-dom'
import { FaCartPlus } from "react-icons/fa";
import { BsFiles } from "react-icons/bs";
const Sidebar = () => {
  return (
    <div className='sidebar'>
        <Link to={'/addproduct'} style={{textDecoration:"none"}}>
        <div className='sidebar-item'>
            <span><FaCartPlus/></span>
            <p>Add Product</p>
        </div>
        </Link>
        <Link to={'/listproduct'} style={{textDecoration:"none"}}>
        <div className='sidebar-item'>
            <span><BsFiles/></span>
            <p>Product List</p>
        </div>
        </Link>
    </div>
  )
}

export default Sidebar